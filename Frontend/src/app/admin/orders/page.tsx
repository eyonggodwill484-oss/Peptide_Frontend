import { redirect } from "next/navigation";

import { getAdminUser } from "@/lib/admin/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { OrdersTableClient } from "./orders-table-client";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const admin = await getAdminUser();
  if (!admin) {
    redirect("/login");
  }

  const db = createAdminSupabaseClient();
  const { data: orders, error } = await db
    .from("orders")
    .select("id, order_number, status, payment_status, payment_method, total, created_at, customers(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold text-destructive">Failed to load orders: {error.message}</p>
      </div>
    );
  }

  const rows = (orders ?? []).map((o) => {
    const customer = Array.isArray(o.customers) ? o.customers[0] : o.customers;
    return {
      id: o.id,
      orderNumber: o.order_number,
      status: o.status,
      paymentStatus: o.payment_status,
      paymentMethod: o.payment_method,
      total: o.total,
      createdAt: o.created_at,
      customerName: customer?.full_name ?? "—",
      customerEmail: customer?.email ?? "—",
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-xl font-extrabold text-foreground mb-6">Orders</h1>
      <OrdersTableClient initialOrders={rows} />
    </div>
  );
}
