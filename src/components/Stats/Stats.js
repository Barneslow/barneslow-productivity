import StatsBar from "./StatsBar";
import styles from "./Stats.module.css";

const Stats = (props) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className={styles.chart}>
      <div className={styles.graph}>
        {props.dataPoints.map((dataPoint) => (
          <StatsBar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={totalMaximum}
            label={dataPoint.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;
