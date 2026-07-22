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

  const [activeTab,setActiveTab] =
    useState("dashboard");

  const [data,setData] =
    useState(null);

  const [loading,setLoading] =
    useState(false);



  const tabs = [
    {
      id:"dashboard",
      label:"Overview",
    },
    {
      id:"sales",
      label:"Sales",
    },
    {
      id:"purchases",
      label:"Purchases",
    },
    {
      id:"inventory",
      label:"Inventory",
    },
    {
      id:"categories",
      label:"Categories",
    },
    {
      id:"suppliers",
      label:"Suppliers",
    },
    {
      id:"low-stock",
      label:"Low Stock",
    },
  ];



  const loadReport = async(tab)=>{

    try{

      setLoading(true);

      let response;


      switch(tab){

        case "dashboard":
          response =
          await reportService.getDashboardSummary();
          break;


        case "sales":
          response =
          await reportService.getSalesReport();
          break;


        case "purchases":
          response =
          await reportService.getPurchaseReport();
          break;


        case "inventory":
          response =
          await reportService.getInventoryReport();
          break;


        case "categories":
          response =
          await reportService.getCategoryReport();
          break;


        case "suppliers":
          response =
          await reportService.getSupplierReport();
          break;


        case "low-stock":
          response =
          await reportService.getLowStockReport();
          break;


        default:
          return;

      }


      setData(response);


    }catch(error){

      console.error(error);

      toast.error(
        "Failed to load report."
      );


    }finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    loadReport(activeTab);

  },[activeTab]);




  return (

    <div className="reports-page">


      <div className="report-tabs">

        {
          tabs.map((tab)=>(

            <button

              key={tab.id}

              className={
                activeTab === tab.id
                ? "active"
                : ""
              }

              onClick={()=>
                setActiveTab(tab.id)
              }

            >

              {tab.label}

            </button>

          ))
        }

      </div>



      <div className="report-content">


      {
        loading && (

          <div className="report-loading">

            Loading report...

          </div>

        )
      }



      {
        !loading &&
        activeTab==="dashboard" &&
        <DashboardSummary
          data={data || {}}
        />
      }



      {
        !loading &&
        activeTab==="sales" &&
        <SalesReport
          data={data || {}}
        />
      }



      {
        !loading &&
        activeTab==="purchases" &&
        <PurchaseReport
          data={data || {}}
        />
      }



      {
        !loading &&
        activeTab==="inventory" &&
        <InventoryReport
          data={
            Array.isArray(data)
            ? data
            : []
          }
        />
      }



      {
        !loading &&
        activeTab==="categories" &&
        <CategoryReport
          data={
            Array.isArray(data)
            ? data
            : []
          }
        />
      }



      {
        !loading &&
        activeTab==="suppliers" &&
        <SupplierReport
          data={
            Array.isArray(data)
            ? data
            : []
          }
        />
      }



      {
        !loading &&
        activeTab==="low-stock" &&
        <LowStockReport
          data={
            Array.isArray(data)
            ? data
            : []
          }
        />
      }


      </div>


    </div>

  );

};


export default Reports;