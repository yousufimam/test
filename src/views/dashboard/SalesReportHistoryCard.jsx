import ReactLoading from "react-loading";
import ReportLineChart from "@/components/report-line-chart/Main";
import { memo } from "react";

const SalesReportHistoryCard = ({ SalesReport, Loading }) => {
  return (
    <div className="intro-y box p-5 mt-12 sm:mt-5">
      {SalesReport.length ? (
        <div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex">
              <div>
                <div className="text-primary dark:text-slate-300 text-lg xl:text-xl font-medium">
                  ${SalesReport.length > 0 ? SalesReport[0]?.currSales : 0}
                </div>

                <div className="mt-0.5 text-slate-500">This Year</div>
              </div>
              <div className="w-px h-12 border border-r border-dashed border-slate-200 dark:border-darkmode-300 mx-4 xl:mx-5"></div>
              <div>
                <div className="text-slate-500 text-lg xl:text-xl font-medium">
                  ${SalesReport.length > 0 ? SalesReport[0]?.prevSales : 0}
                </div>

                <div className="mt-0.5 text-slate-500">Last Year</div>
              </div>
            </div>
          </div>
          <div className="report-chart">
            <ReportLineChart height={275} data={SalesReport} className="mt-6 -mb-6" />
          </div>
        </div>
      ) : Loading ? (
        <ReactLoading type="bubbles" color="#1E40AF" />
      ) : (
        <div className="text-3xl font-medium leading-8 mt-6 mb-6">N/A</div>
      )}
    </div>
  );
};

export default memo(SalesReportHistoryCard);
