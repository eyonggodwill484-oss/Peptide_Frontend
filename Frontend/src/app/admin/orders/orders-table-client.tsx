"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPrice } from "@/lib/format-currency";
import type { OrderStatus, PaymentStatus } from "@/types/database.types";

type OrderRow = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string | null;
  total: number;
  createdAt: string;
  customerName: string;
  customerEmail: string;
};

const ORDER_STATUSES: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"];
const PAYMENT_STATUSES: PaymentStatus[] = ["pending", "paid", "failed", "refunded"];

export function OrdersTableClient({ initialOrders }: { initialOrders: OrderRow[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function updateOrder(id: string, patch: { status?: OrderStatus; paymentStatus?: PaymentStatus }) {
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
      toast.success(data.emailSent ? "Status updated — customer notified by email." : "Status updated.");
    } catch {
      toast.error("Failed to update order.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Placed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-xs font-bold">{order.orderNumber}</TableCell>
              <TableCell>
                <div className="text-xs font-semibold">{order.customerName}</div>
                <div className="text-[11px] text-muted-foreground">{order.customerEmail}</div>
              </TableCell>
              <TableCell className="font-mono text-xs">{formatPrice(order.total)}</TableCell>
              <TableCell>
                <Select
                  value={order.paymentStatus}
                  disabled={pendingId === order.id}
                  onValueChange={(v) => updateOrder(order.id, { paymentStatus: v as PaymentStatus })}
                >
                  <SelectTrigger className="h-8 w-28 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PAYMENT_STATUSES.map((s) => (
                      <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  disabled={pendingId === order.id}
                  onValueChange={(v) => updateOrder(order.id, { status: v as OrderStatus })}
                >
                  <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((s) => (
                      <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-10">
                No orders yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
