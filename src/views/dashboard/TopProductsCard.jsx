import { helper as $h } from "@/utils";
import ReactLoading from "react-loading";
import ReportPieChart from "@/components/report-pie-chart/Main";
import classnames from "classnames";
import { memo } from "react";

const TopProductsCard = ({ TopProducts, Loading }) => {
  return (
    <div className="intro-y box p-5 mt-5">
      {TopProducts.length ? (
        <div>
          <div className="mt-3">
            <ReportPieChart height={213} data={TopProducts} />
          </div>
          <div className="w-56 sm:w-auto mx-auto mt-4 grid grid-cols-2  ">
            {TopProducts.map((value, index) => {
              return (
                <div
                  key={index}
                  className={classnames({
                    "flex items-center mt-4 mx-2": true
                  })}
                >
                  <div
                    className={classnames({
                      "w-2 h-2 rounded-full mr-3": true,
                      "bg-primary": index == 0,
                      "bg-pending": index == 1,
                      "bg-warning": index == 2,
                      "bg-secondary": index == 3,
                      "bg-success": index == 4,
                      "bg-info": index == 5
                    })}
                  ></div>
                  <span className="truncate">{$h.capitalizeFirstLetter(value.productName)}</span>
                  <span className="font-medium ml-auto">{value.productPercentage}%</span>
                </div>
              );
            })}
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

export default memo(TopProductsCard);
