type Company = {
  symbol: string;
  date: string;
  grossProfit: number;
  grossProfitRatio: number;
  ebitda: number;
  ebitdaratio: number;
  operatingExpenses: number;
}

function getCompanyData(data: Company[]) {
  const dataCompany = data.reverse();
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

export default getCompanyData;
