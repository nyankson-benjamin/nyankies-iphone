import { Alert as AlertType } from '../../context/AlertContext';
import CloseIcon from '../../assets/icons/CloseIcon';
import { useAlert } from '../../hooks/useAlert';

const severityClasses = {
  success: 'bg-green-100 text-green-800 border-green-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
};

function Alert({ alert }: { alert: AlertType }) {
  const { removeAlert } = useAlert();

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
        severityClasses[alert.severity]
      }`}
    >
      <p>{alert.message}</p>
      <button
        onClick={() => removeAlert(alert.id)}
        className="ml-4 hover:opacity-70"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export function AlertContainer() {
  const { alerts } = useAlert();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 min-w-[300px] max-w-[400px]">
      {alerts.map((alert) => (
        <Alert key={alert.id} alert={alert} />
      ))}
    </div>
  );
} 