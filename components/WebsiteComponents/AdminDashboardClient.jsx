"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle,
  XCircle,
  Trash2,
  ExternalLink,
  Clock,
  ShieldCheck,
  LayoutGrid,
} from "lucide-react";
import { format } from "date-fns";

const STATUS_TABS = [
  { key: "all",      label: "All" },
  { key: "pending",  label: "Pending" },
  { key: "approved", label: "Approved" },
];

export default function AdminDashboardClient({ initialPortfolios }) {
  const [portfolios, setPortfolios] = useState(initialPortfolios ?? []);
  const [activeTab, setActiveTab] = useState("all");
  const [loadingId, setLoadingId] = useState(null);

  const filtered = portfolios.filter((p) => {
    if (activeTab === "pending")  return !p.isApproved;
    if (activeTab === "approved") return p.isApproved;
    return true;
  });

  const counts = {
    all:      portfolios.length,
    pending:  portfolios.filter((p) => !p.isApproved).length,
    approved: portfolios.filter((p) => p.isApproved).length,
  };

  const handleApproval = async (id, approve) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/portfolios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: approve }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      setPortfolios((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isApproved: approve } : p))
      );
      toast.success(approve ? "Portfolio approved" : "Portfolio rejected");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this portfolio permanently?")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/portfolios/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setPortfolios((prev) => prev.filter((p) => p._id !== id));
      toast.success("Portfolio deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-orange-500" />
            Admin Dashboard
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Review and approve portfolios before they appear in the public gallery.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          {[
            { label: "Total Portfolios", value: counts.all,      icon: <LayoutGrid size={18} className="text-neutral-500" /> },
            { label: "Pending Approval", value: counts.pending,  icon: <Clock      size={18} className="text-amber-500"   /> },
            { label: "Approved",         value: counts.approved, icon: <CheckCircle size={18} className="text-green-600"  /> },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-neutral-300 rounded-lg shadow-box border border-neutral-400 p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-neutral-500">{s.label}</p>
                <p className="text-2xl font-bold text-neutral-800">{s.value}</p>
              </div>
              {s.icon}
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-neutral-300  rounded-lg shadow-box border border-neutral-400 overflow-hidden">

          {/* Gradient accent bar */}
          <div className="h-1.5 w-full" style={{
            background: "linear-gradient(90deg, #f59e0b, #f97316, #e11d48)"
          }} />

          {/* Tab bar */}
          <div className="flex items-center gap-2 px-4 pt-4 pb-0 border-b border-neutral-400">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-t-md border-b-2 transition-colors
                  ${activeTab === tab.key
                    ? "border-orange-500 text-orange-600 bg-neutral-200"
                    : "border-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
                  }`}
              >
                {tab.label}
                <span className={`ml-2 text-xs px-1.5 py-1 rounded-md
                  ${activeTab === tab.key ? "bg-orange-100 text-orange-700" : "bg-neutral-400 text-neutral-700"}`}>
                  {counts[tab.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-neutral-500 text-sm">
              No portfolios in this category.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm overflow-x-auto">
                <thead>
                  <tr className="bg-neutral-200 border-b border-neutral-400 text-left text-xs text-neutral-600 uppercase tracking-wide">
                    <th className="px-4 py-3">Portfolio</th>
                    <th className="px-4 py-3">Author</th>
                    <th className="px-4 py-3">URL</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-400">
                  {filtered.map((p) => {
                    const busy = loadingId === p._id;
                    return (
                      <tr
                        key={p._id}
                        className="hover:bg-neutral-200 transition-colors"
                      >
                        {/* Title + description */}
                        <td className="px-4 py-3 max-w-[180px]">
                          <p className="font-medium text-neutral-900 truncate">
                            {p.title}
                          </p>
                          {p.description && (
                            <p className="text-xs text-neutral-500 truncate mt-0.5">
                              {p.description}
                            </p>
                          )}
                        </td>

                        {/* Author */}
                        <td className="px-4 py-3">
                          <p className="text-neutral-800 font-medium">
                            {p.author?.name ?? "—"}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {p.author?.email ?? ""}
                          </p>
                        </td>

                        {/* URL */}
                        <td className="px-4 py-3">
                          <a
                            href={`/portfolio/${p.url}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-orange-700 hover:underline text-xs"
                          >
                            /{p.url}
                            <ExternalLink size={11} />
                          </a>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3 text-xs text-neutral-500 whitespace-nowrap">
                          {format(new Date(p.createdAt), "MMM dd, yyyy")}
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-3">
                          {p.isApproved ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              <CheckCircle size={11} /> Approved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                              <Clock size={11} /> Pending
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {p.isApproved ? (
                              <button
                                disabled={busy}
                                onClick={() => handleApproval(p._id, false)}
                                className="flex items-center gap-1  px-3 py-1.5 rounded-sm text-xs font-medium
                                           border border-neutral-500 text-neutral-700 hover:bg-neutral-800 hover:text-white
                                           transition-colors disabled:opacity-50"
                              >
                                <XCircle size={12} />
                                Reject
                              </button>
                            ) : (
                              <button
                                disabled={busy}
                                onClick={() => handleApproval(p._id, true)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-medium
                                           bg-neutral-800 text-white hover:bg-neutral-900
                                           transition-colors disabled:opacity-50 button-box"
                              >
                                <CheckCircle size={12} />
                                Approve
                              </button>
                            )}
                            <button
                              disabled={busy}
                              onClick={() => handleDelete(p._id)}
                              className="flex items-center gap-1  px-3 py-1.5 rounded-sm text-xs font-medium
                                         bg-red-500 hover:bg-red-600 text-white
                                         transition-colors disabled:opacity-50 color-btn-box"
                            >
                              <Trash2 size={12} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}