import React, { useState } from 'react';
import { getUptimeState, roundUptime } from '../../utils';
import SubSection from './subSection';
import constants from '../../constants';
import { ButtonLink } from '../../uiComponents';

const speedometer = (
  <svg
    width="28"
    height="20"
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="14" height="11" fill="white" />
    <path
      d="M6.53047 0.690704C5.41204 0.75132 4.35513 1.02665 3.40607 1.47387L4.68972 3.55825C5.25688 3.3092 5.87722 3.14912 6.53047 3.09689V0.690704Z"
      fill="#DFE300"
    />
    <path
      d="M7.4696 0.689941V3.09677C8.12179 3.14944 8.74151 3.31093 9.30845 3.56133L10.5963 1.47018C9.64632 1.02439 8.58876 0.749941 7.4696 0.689941Z"
      fill="#FF782C"
    />
    <path
      d="M11.41 1.90982L10.1205 4.00384C10.643 4.34791 11.0987 4.77532 11.4653 5.26502L13.6999 4.05555C13.1004 3.20146 12.32 2.47091 11.41 1.90982V1.90982Z"
      fill="#A50000"
    />
    <path
      d="M0.306274 4.0588L2.52965 5.26222C2.8964 4.771 3.35274 4.34292 3.87674 3.99909L2.59309 1.9147C1.68462 2.4765 0.905555 3.20711 0.306274 4.0588Z"
      fill="#37AB00"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.43152 9.54101L5.34966 10.4987L6.50147 9.22745C6.68101 9.30004 6.87939 9.3344 7.08547 9.32074C7.81506 9.27243 8.3676 8.64145 8.31921 7.91187C8.30661 7.72158 8.25419 7.54337 8.17098 7.38479L11.6913 3.49921L7.6611 6.85331C7.44135 6.72592 7.18259 6.6601 6.91028 6.67815C6.18069 6.72645 5.62815 7.35743 5.67655 8.08701C5.68477 8.21175 5.71012 8.33145 5.75006 8.44371L4.43152 9.54101Z"
      fill="black"
    />
  </svg>
);

interface IProps {
  uptime: number;
  monitoring: string;
  monitoring_link?: string;
  rate_limiting: string;
  rate_limiting_resume?: string;
}

const ApiDetails: React.FC<IProps> = ({
  uptime,
  monitoring,
  monitoring_link = null,
  rate_limiting,
  rate_limiting_resume,
}) => {
  const [showRateLimitDesc, setShowRateLimitDesc] = useState(false);
  const [showMonitoringDesc, setShowMonitoringDesc] = useState(false);

  return (
    <SubSection title="L’Api en détail">
      <div className="badge uptime">
        <div>
          <div className="icon uptime-stat" />
        </div>
        <div>{roundUptime(2)(uptime)}% actif / dernier mois</div>
        {monitoring && (
          <button onClick={() => setShowMonitoringDesc(!showMonitoringDesc)}>
            {showMonitoringDesc ? '-' : '+'}
          </button>
        )}
      </div>
      {monitoring && showMonitoringDesc && (
        <>
          <div className="details">
            <i>{monitoring}</i>
            {monitoring_link && (
              <div className="layout-right vertical-margin">
                <ButtonLink
                  href={monitoring_link}
                  target="_blank"
                  rel="noopener"
                  alt
                >
                  <i className="icon linkify"></i> Accéder au monitoring
                </ButtonLink>
              </div>
            )}
          </div>
        </>
      )}
      <div className="badge">
        <div>{speedometer}</div>
        <div>
          {rate_limiting_resume
            ? rate_limiting_resume
            : 'Les limites d’utilisation de cette API ne sont pas publiques'}
        </div>
        {rate_limiting && (
          <button onClick={() => setShowRateLimitDesc(!showRateLimitDesc)}>
            {showRateLimitDesc ? '-' : '+'}
          </button>
        )}
      </div>
      {rate_limiting && showRateLimitDesc && (
        <div className="details">
          <i>{rate_limiting}</i>
        </div>
      )}
      <style jsx>{`
        .badge {
          display: inline-flex;
          align-items: center;
          margin: 4px 0;
          width: 100%;
        }

        .badge > div:first-of-type {
          flex-shrink: 0;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge > div:last-of-type {
          flex-grow: 1;
        }
        .badge > button {
          flex-grow: 0;
          flex-shrink: 0;
          border: none;
          background-color: ${constants.colors.lightBlue};
          color: ${constants.colors.blue};
          border-radius: 2px;
          padding: 4px 8px;
          font-weight: bold;
        }

        .details {
          border-radius: 3px;
          background-color: ${constants.colors.lightBlue};
          padding: 5px 10px;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .uptime-stat {
          min-width: 15px;
          min-height: 15px;
          border-radius: 100%;
          margin: 0 7px;
          background-color: ${getUptimeState(uptime)};
        }
      `}</style>
    </SubSection>
  );
};

export default ApiDetails;
