"use client";

import { useRef, useState } from "react";
import PortfolioTable from "@/components/portfolio/PortfolioTable";
import SectorBreakdown from "@/components/portfolio/SectorBreakdown";
import { usePortfolio, useSyncAngelOne, useUploadZerodhaCSV, useDeleteHolding } from "@/hooks/usePortfolio";
import { Upload, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TABS = ["All", "AngelOne", "Zerodha", "Manual"];

export default function PortfolioPage() {
  const { data: portfolio, isLoading } = usePortfolio();
  const syncAngelOne = useSyncAngelOne();
  const uploadCSV = useUploadZerodhaCSV();
  const deleteHolding = useDeleteHolding();

  const [activeTab, setActiveTab] = useState("All");
  const [angelOneOpen, setAngelOneOpen] = useState(false);
  const [credentials, setCredentials] = useState({ clientId: "", password: "", totpSecret: "" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const fileInputRef = useRef(null);

  const holdings = portfolio || [];

  // Filter by tab
  const filteredHoldings = holdings.filter((h) => {
    if (activeTab === "All") return true;
    if (activeTab === "AngelOne") return h.source === "angelone";
    if (activeTab === "Zerodha") return h.source === "zerodha";
    if (activeTab === "Manual") return h.source === "manual";
    return true;
  });

  const totalInvested = holdings.reduce((sum, h) => sum + h.avgPrice * h.quantity, 0);
  const totalCurrent = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const totalPnl = totalCurrent - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? ((totalPnl / totalInvested) * 100).toFixed(2) : "0.00";

  const handleAngelOneSync = async () => {
    await syncAngelOne.mutateAsync(credentials);
    setAngelOneOpen(false);
    setCredentials({ clientId: "", password: "", totpSecret: "" });
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadCSV.mutate(file);
  };

  const handleSelectAll = (checked) => {
    if (checked) setSelectedIds(filteredHoldings.map((h) => h.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id, checked) => {
    if (checked) setSelectedIds((prev) => [...prev, id]);
    else setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleBulkDelete = async () => {
    await Promise.all(selectedIds.map((id) => deleteHolding.mutateAsync(id)));
    setSelectedIds([]);
    setDeleteConfirmOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 text-xl font-semibold mt-4">Portfolio</h1>
          <p className="text-slate-500 text-sm mt-1">Your current holdings and performance</p>
        </div>
        <div className="flex gap-2">
          <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
          <Button
            variant="outline"
            className="border-amber-200 text-slate-700 hover:bg-amber-50 text-sm gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadCSV.isPending}
          >
            <Upload size={15} />
            {uploadCSV.isPending ? "Uploading..." : "Upload CSV"}
          </Button>
          <Button
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm gap-2"
            onClick={() => setAngelOneOpen(true)}
          >
            <RefreshCw size={15} />
            Sync Angel One
          </Button>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="bg-white border border-amber-200 rounded-xl px-6 py-4 flex gap-8">
        <div>
          <p className="text-slate-500 text-xs">Total Invested</p>
          <p className="text-slate-900 font-semibold text-base mt-0.5">
            ₹{totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="w-px bg-amber-100" />
        <div>
          <p className="text-slate-500 text-xs">Current Value</p>
          <p className="text-slate-900 font-semibold text-base mt-0.5">
            ₹{totalCurrent.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="w-px bg-amber-100" />
        <div>
          <p className="text-slate-500 text-xs">Total P&L</p>
          <p className={`font-semibold text-base mt-0.5 ${totalPnl >= 0 ? "text-green-600" : "text-red-600"}`}>
            {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toLocaleString("en-IN", { maximumFractionDigits: 0 })}{" "}
            <span className="text-sm font-normal">({totalPnl >= 0 ? "+" : ""}{totalPnlPercent}%)</span>
          </p>
        </div>
        <div className="w-px bg-amber-100" />
        <div>
          <p className="text-slate-500 text-xs">Holdings</p>
          <p className="text-slate-900 font-semibold text-base mt-0.5">{holdings.length} stocks</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-white border border-amber-200 rounded-lg p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedIds([]); }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === tab
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-amber-50 hover:text-slate-900"
                }`}
            >
              {tab}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${activeTab === tab
                  ? "bg-slate-700 text-white"
                  : "bg-amber-100 text-amber-700"
                }`}>
                {tab === "All" ? holdings.length
                  : tab === "AngelOne" ? holdings.filter(h => h.source === "angelone").length
                    : tab === "Zerodha" ? holdings.filter(h => h.source === "zerodha").length
                      : holdings.filter(h => h.source === "manual").length}
              </span>
            </button>
          ))}
        </div>

        {/* Bulk delete button */}
        {selectedIds.length > 0 && (
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 gap-2 text-sm"
            onClick={() => setDeleteConfirmOpen(true)}
          >
            <Trash2 size={14} />
            Delete {selectedIds.length} selected
          </Button>
        )}
      </div>

      {/* Sector Breakdown */}
      <SectorBreakdown portfolio={filteredHoldings} />

      {/* Table */}
      {isLoading ? (
        <div className="bg-white border border-amber-200 rounded-xl p-8 text-center text-slate-400 text-sm animate-pulse">
          Loading portfolio...
        </div>
      ) : filteredHoldings.length === 0 ? (
        <div className="bg-white border border-amber-200 rounded-xl p-8 text-center text-slate-400 text-sm">
          No holdings found for this source.
        </div>
      ) : (
        <PortfolioTable
          data={filteredHoldings}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
        />
      )}

      {/* Angel One Dialog */}
      <Dialog open={angelOneOpen} onOpenChange={setAngelOneOpen}>
        <DialogContent className="bg-white border-amber-200">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Sync Angel One</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 text-sm">Client ID</Label>
              <Input
                className="bg-amber-50 border-amber-200"
                value={credentials.clientId}
                onChange={(e) => setCredentials({ ...credentials, clientId: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 text-sm">Password</Label>
              <Input
                type="password"
                className="bg-amber-50 border-amber-200"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 text-sm">TOTP Secret</Label>
              <Input
                className="bg-amber-50 border-amber-200"
                placeholder="e.g. ZG4FCHVDHWZYIWSVLS..."
                value={credentials.totpSecret}
                onChange={(e) => setCredentials({ ...credentials, totpSecret: e.target.value })}
              />
            </div>
            {syncAngelOne.isError && (
              <p className="text-red-600 text-xs">
                {syncAngelOne.error?.response?.data?.message || "Sync failed"}
              </p>
            )}
            <Button
              className="bg-slate-900 hover:bg-slate-800 text-white w-full"
              onClick={handleAngelOneSync}
              disabled={syncAngelOne.isPending}
            >
              {syncAngelOne.isPending ? "Syncing..." : "Sync Holdings"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="bg-white border-amber-200">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-2">
            <p className="text-slate-600 text-sm">
              Are you sure you want to delete {selectedIds.length} holding{selectedIds.length > 1 ? "s" : ""}? This cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                className="border-amber-200 text-slate-700"
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white gap-2"
                onClick={handleBulkDelete}
                disabled={deleteHolding.isPending}
              >
                <Trash2 size={14} />
                {deleteHolding.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}