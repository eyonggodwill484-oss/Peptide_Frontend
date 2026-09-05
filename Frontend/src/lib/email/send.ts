import type { ReactElement } from "react";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getResendClient, EMAIL_FROM } from "./resend";
import { OrderConfirmationEmail, type OrderConfirmationProps } from "./templates/order-confirmation";
import { CartRecoveryEmail, type CartRecoveryProps } from "./templates/cart-recovery";
import { OrderStatusUpdateEmail, type OrderStatusUpdateProps } from "./templates/order-status-update";

type EmailEventMeta = {
  type: string;
  recipient: string;
  relatedType?: string;
  relatedId?: string;
};

async function logEmailEvent(
  meta: EmailEventMeta,
  result: { messageId: string | null; error: string | null }
) {
  try {
    const admin = createAdminSupabaseClient();
    await admin.from("email_events").insert({
      type: meta.type,
      recipient: meta.recipient,
      related_type: meta.relatedType ?? null,
      related_id: meta.relatedId ?? null,
      resend_message_id: result.messageId,
      status: result.error ? "failed" : "sent",
      error: result.error,
    });
  } catch (err) {
    // Logging failure should never take down the actual send path.
    console.error("Failed to log email event:", err);
  }
}

async function dispatch(params: {
  to: string;
  subject: string;
  react: ReactElement;
  meta: EmailEventMeta;
}): Promise<{ ok: boolean; messageId: string | null }> {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: params.to,
      subject: params.subject,
      react: params.react,
    });

    if (error) {
      await logEmailEvent(params.meta, { messageId: null, error: error.message });
      return { ok: false, messageId: null };
    }

    await logEmailEvent(params.meta, { messageId: data?.id ?? null, error: null });
    return { ok: true, messageId: data?.id ?? null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await logEmailEvent(params.meta, { messageId: null, error: message });
    return { ok: false, messageId: null };
  }
}

export async function sendCartRecoveryEmail(to: string, cartSessionId: string, props: CartRecoveryProps) {
  const subjects: Record<1 | 2 | 3, string> = {
    1: "You left something in your cart",
    2: "10% off what's in your cart",
    3: "Last chance — 15% off your cart",
  };
  return dispatch({
    to,
    subject: subjects[props.stage],
    react: CartRecoveryEmail(props),
    meta: { type: `cart_recovery_stage_${props.stage}`, recipient: to, relatedType: "cart_session", relatedId: cartSessionId },
  });
}

export async function sendOrderStatusEmail(to: string, orderId: string, props: OrderStatusUpdateProps) {
  const subjects: Record<OrderStatusUpdateProps["kind"], string> = {
    paid: "Payment Received",
    shipped: "Your Order Has Shipped",
    delivered: "Order Delivered",
    cancelled: "Order Cancelled",
    refunded: "Order Refunded",
  };
  return dispatch({
    to,
    subject: `${subjects[props.kind]} — #${props.orderNumber}`,
    react: OrderStatusUpdateEmail(props),
    meta: { type: `order_status_${props.kind}`, recipient: to, relatedType: "order", relatedId: orderId },
  });
}

export async function sendOrderConfirmationEmail(
  to: string,
  orderId: string,
  props: OrderConfirmationProps
) {
  return dispatch({
    to,
    subject: `Order Confirmed — #${props.orderNumber}`,
    react: OrderConfirmationEmail(props),
    meta: { type: "order_confirmation", recipient: to, relatedType: "order", relatedId: orderId },
  });
}
