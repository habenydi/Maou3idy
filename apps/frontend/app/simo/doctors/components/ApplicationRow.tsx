type ApplicationRowProps = {
  name: string;
  email: string;
  specialty: string;
  date: string;
  image: string;
};

export default function ApplicationRow({
  name,
  email,
  specialty,
  date,
  image,
}: ApplicationRowProps) {
  return (
    <tr className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
      <td className="px-6 py-5 rounded-l-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="font-bold text-base">{name}</div>
            <div className="text-xs text-on-surface-variant">
              {email}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="inline-flex items-center px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold">
          {specialty}
        </div>
      </td>

      <td className="px-6 py-5 text-sm">
        {date}
      </td>

      <td className="px-6 py-5">
        <span className="px-3 py-1.5 bg-tertiary-container/10 text-tertiary font-bold text-xs rounded-lg flex items-center gap-2 w-fit">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          Pending
        </span>
      </td>

      <td className="px-6 py-5 rounded-r-2xl text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:text-primary">
            <span className="material-symbols-outlined">
              visibility
            </span>
          </button>

          <button className="p-2 hover:text-green-600">
            <span className="material-symbols-outlined">
              check_circle
            </span>
          </button>

          <button className="p-2 hover:text-error">
            <span className="material-symbols-outlined">
              cancel
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}