import { api, apikey } from "../services/api";

type Company = {
  symbol: string;
  date: string;
  grossProfit: number;
  grossProfitRatio: number;
  ebitda: number;
  ebitdaratio: number;
  operatingExpenses: number;
  revenue: string;
  costOfRevenue: string;
}

export function getCompanyData(company: Company[]) {
  const dataCompany = company.reverse();
  const lastYears = dataCompany.map((company: Company) => String(new Date(company.date).getFullYear()));
  const grossProfit = dataCompany.map((company: Company) => company.grossProfit);
  const grossProfitRatio = dataCompany.map((company: Company) => company.grossProfitRatio);
  const ebitda = dataCompany.map((company: Company) => company.ebitda);
  const ebitdaRatio = dataCompany.map((company: Company) => company.ebitdaratio);
  const operatingExpenses = dataCompany.map((company: Company) => company.operatingExpenses);
  const series = [{
    name: 'Gross Profit',
    data: grossProfit
  }, {
    name: 'Operating Expenses',
    data: operatingExpenses
  }, {
    name: 'EBITDA',
    data: ebitda
  }];

  return {
    lastYears,
    grossProfit,
    grossProfitRatio,
    ebitda,
    ebitdaRatio,
    operatingExpenses,
    series
  };
}

export async function getCompaniesSelectedData(symbol: string, period: string) {

  return api.get(`income-statement/${symbol}`, {
    params: {
      limit: period,
      apikey: apikey
    }
  })
    .then(({ data }) => {
      const dataCompany = data.reverse();
      const lastYears = dataCompany.map((company: Company) => String(new Date(company.date).getFullYear()));
      const revenue = dataCompany.map((company: Company) => company.revenue);
      const costOfRevenue = dataCompany.map((company: Company) => company.costOfRevenue);

      const column = {
        type: 'column',
        name: `${symbol} - Reveneu`,
        data: revenue
      };
      const spline = {
        type: 'spline',
        name: `${symbol} - Cost of reveneu`,
        data: costOfRevenue
      };

      return {
        column,
        spline,
        lastYears
      };
    })
    .catch((error) => alert(error));
}
