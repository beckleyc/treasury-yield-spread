import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface YieldResponse {
    "threeMonth": AxiosResponse<any>,
    "tenYear": AxiosResponse<any>
}

async function main() {
    const yieldData = await getYieldResponseData();
    const spread = getYieldSpread(yieldData);

    console.log("Spread for last 10 days: ", spread);
}

async function getYieldResponseData(): Promise<YieldResponse> {
    const threeMonthYield = await getThreeMonthYield();
    const tenYearYield = await getTenYearYield();

    return {
        "threeMonth": threeMonthYield,
        "tenYear": tenYearYield
    };
}

function getYieldSpread({threeMonth, tenYear}: YieldResponse) {
    const threeMonthLastTenDays = threeMonth.data.dataset.data.slice(0,10);
    const tenYearLastTenDays = tenYear.data.dataset.data.slice(0,10);

    return tenYearLastTenDays.map((currValue: Array<any>, i: number) => tenYearLastTenDays[i][1] - threeMonthLastTenDays[i][1]);
}

async function getThreeMonthYield() {
    const url = 'https://www.quandl.com/api/v3/datasets/FRED/DTB3.json?api_key=1gKbE_oE1FyxTB5FcFhH';
    return sendGetRequest(url);
}

async function getTenYearYield() {
    const url = 'https://www.quandl.com/api/v3/datasets/FRED/DGS10.json?api_key=1gKbE_oE1FyxTB5FcFhH';
    return sendGetRequest(url);
}

async function sendGetRequest(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return axios(url, config);
}


main();