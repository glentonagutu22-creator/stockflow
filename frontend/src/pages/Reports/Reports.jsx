import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./Reports.css";

import DashboardSummary from "../../components/reports/DashboardSummary/DashboardSummary";
import InventoryReport from "../../components/reports/InventoryReport/InventoryReport";
import LowStockReport from "../../components/reports/LowStockReport/LowStockReport";
import SalesReport from "../../components/reports/SalesReport/SalesReport";
import PurchaseReport from "../../components/reports/PurchaseReport/PurchaseReport";
import CategoryReport from "../../components/reports/CategoryReport/CategoryReport";
import SupplierReport from "../../components/reports/SupplierReport/SupplierReport";

import * as reportService from "../../services/reportService";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadReport = async (tab) => {
    try {
      setLoading(true);

      let response;

      switch (tab) {
        case "dashboard":
          response = await reportService.getDashboardSummary();
          break;

        case "sales":
          response = await reportService.getSalesReport();
          break;

        case "purchases":
          response = await reportService.getPurchaseReport();
          break;

        case "inventory":
          response = await reportService.getInventoryReport();
          break;

        case "categories":
          response = await reportService.getCategoryReport();
          break;

        case "suppliers":
          response = await reportService.getSupplierReport();
          break;

        case "low-stock":
          response = await reportService.getLowStockReport();
          break;

        default:
          return;
      }

      console.log(`${tab}:`, response);

      setData(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport(activeTab);
  }, [activeTab]);

  return (
    <div className="reports-page">
      <div className="report-tabs">
        <button onClick={() => setActiveTab("dashboard")}>Overview</button>
        <button onClick={() => setActiveTab("sales")}>Sales</button>
        <button onClick={() => setActiveTab("purchases")}>Purchases</button>
        <button onClick={() => setActiveTab("inventory")}>Inventory</button>
        <button onClick={() => setActiveTab("categories")}>Categories</button>
        <button onClick={() => setActiveTab("suppliers")}>Suppliers</button>
        <button onClick={() => setActiveTab("low-stock")}>Low Stock</button>
      </div>

      {loading && <h3>Loading...</h3>}

      {!loading && activeTab === "dashboard" && (
        <DashboardSummary data={data || {}} />
      )}

      {!loading && activeTab === "sales" && (
        <SalesReport data={data || {}} />
      )}

      {!loading && activeTab === "purchases" && (
        <PurchaseReport data={data || {}} />
      )}

      {!loading && activeTab === "inventory" && (
        <InventoryReport data={Array.isArray(data) ? data : []} />
      )}

      {!loading && activeTab === "categories" && (
        <CategoryReport data={Array.isArray(data) ? data : []} />
      )}

      {!loading && activeTab === "suppliers" && (
        <SupplierReport data={Array.isArray(data) ? data : []} />
      )}

      {!loading && activeTab === "low-stock" && (
        <LowStockReport data={Array.isArray(data) ? data : []} />
      )}
    </div>
  );
};

export default Reports;