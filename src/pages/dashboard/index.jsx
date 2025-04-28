/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import moment from 'moment';

import './styles.css';

//primereact
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';

//Helpers
import {
  normalizeDataForChart,
  generateOriginsConfig,
} from '../../helpers/utils';

//Services
import { getSurveysResponses } from '../../services/usersSurveysResponses/surveys';

//Components
import { GroupButton } from '../../components/buttons/groupButtons';
import { DatePicker } from '../../components/datePickers';
import { SimpleChart } from '../../components/charts/simpleChart';
import { SimpleInput } from '../../components/inputs/simpleInput';

const usersStatus = [
  {
    key: 'hour',
    name: 'Hora',
  },
  {
    key: 'day',
    name: 'Dia',
  },
  {
    key: 'month',
    name: 'Mes',
  },
];

const buttonOptions = ['Hoje', '7 dias', 'Mês', 'Personalizado'];

function Dashboard({ expandedHeader }) {
  const toast = useRef(null);

  const [groupBy, setGroupBy] = useState('hour');

  const [buttonValue, setButtonValue] = useState('7 dias');

  const [rangeDates, setRangeDates] = useState({
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });

  const [unitsOrdersData, setUnitsOrdersData] = useState(null);
  const [chartLegend, setChartLegend] = useState(null);

  //Loadings
  const [unitsLoading, setunitsLoading] = useState(false);

  //Buttons to definition range date comportament
  useEffect(() => {
    const daysToSubtract =
      buttonValue === '7 dias' ? 7 : buttonValue === '14 dias' ? 14 : 30;

    if (buttonValue === 'Hoje') {
      setRangeDates({
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      });
    }

    if (buttonValue !== 'Personalizado' && buttonValue !== 'Hoje') {
      setRangeDates({
        startDate: moment()
          .subtract(daysToSubtract, 'days')
          .format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      });
    }
  }, [buttonValue]);

  //Graphy route
  useEffect(() => {
    (async () => {
      try {
        setunitsLoading(true);

        const units = await getSurveysResponses(
          rangeDates.startDate,
          rangeDates.endDate,
          groupBy
        );

        const chartLegend = generateOriginsConfig(units);
        const graphyData = normalizeDataForChart(units);

        setUnitsOrdersData(graphyData);
        setChartLegend(chartLegend);
      } catch (err) {
        console.log(err);
      } finally {
        setunitsLoading(false);
      }
    })();
  }, [rangeDates, groupBy]);

  return (
    <>
      {window.innerWidth < 768 ? (
        <div className="fixedHeaderMobile">
          <h1>Dashboard</h1>
        </div>
      ) : (
        <div
          className={`fixedHeaderDesktop flex align-items-center justify-content-between mb-4 ${expandedHeader ? 'fixedHeaderExpanded' : 'fixedHeaderNotExpanded'}`}
        >
          <h1 className="pl-5">Dashboard</h1>
        </div>
      )}
      <div
        className={`${window.innerWidth < 768 ? 'pageContainerMobile' : 'pageContainer'} dashboardContainer ${expandedHeader ? 'fixedHeaderExpanded' : 'fixedHeaderNotExpanded'}`}
      >
        <div
          className={` aling-items-center ${window.innerWidth < 768 ? 'flex-column' : 'flex'} justify-content-between`}
        >
          <div className="dashboardButtonPickerContainer gap-2">
            <>
              <div className="mt-3">
                <GroupButton
                  options={buttonOptions}
                  value={buttonValue}
                  setValue={setButtonValue}
                  disabled={unitsLoading ? true : false}
                />
              </div>

              <div className="mt-3">
                <DatePicker
                  rangeDates={rangeDates}
                  setRangeDates={setRangeDates}
                  buttonValue={buttonValue}
                  disabled={unitsLoading ? true : false}
                />
              </div>
            </>
          </div>

          <div
            className={`${window.innerWidth < 768 ? 'w-full' : 'w-18rem'} flex  justify-content-start flex-column`}
          >
            <label className="labelText mb-1">Agrupar por</label>
            <SimpleInput
              label="name"
              background={'#fff'}
              defaultValue={'hour'}
              options={usersStatus}
              selectedOption={groupBy}
              setSelectedOption={setGroupBy}
              disabled={unitsLoading ? true : false}
            />
          </div>
        </div>

        <div className="allDashboardCharts mt-3 gap-2 scrollable">
          {unitsLoading === true ? (
            <>
              <Skeleton className="w-12 h-24rem p-3"></Skeleton>
            </>
          ) : (
            <>
              <div className="chartContainerFull p-3 mb-4">
                <h1 className="mb-4">Evolução da taxa de conversão</h1>

                <SimpleChart
                  typeChart={'line'}
                  width={window.innerWidth < 768 ? '200%' : '100%'}
                  groupBy={groupBy}
                  data={unitsOrdersData ? unitsOrdersData : []}
                  legend={chartLegend ? chartLegend : []}
                />
              </div>
            </>
          )}
        </div>

        <div>
          <Toast ref={toast} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
