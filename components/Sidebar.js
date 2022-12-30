
import { useItems } from '../hooks/useItems';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// var relativeTime = require('')
dayjs.extend(relativeTime)


export default function Sidebar() {
  const [items, loading, error] = useItems();
  const timestamp = 1234567890;

  const relativeTime = dayjs(timestamp).fromNow();
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {items.map((item) => {
          const statusColor = {
            "pending": "bg-yellow-700 text-yellow-800",
            "processing": "bg-blue-700 text-green-800",
            "processed": "bg-green-700 text-green-800",
            "completed": "bg-green-700 text-green-800",
          }
          return (
            <li key={item.id}>
              <div className="relative pb-8">

                <div className="relative">
                  <img
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                    src={item.imageUrl}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">

                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Created {dayjs(item.timestamp).fromNow()}</p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{item.text}</p>
                  </div>
                  <a
                    // href={tag.href}
                    className="mt-2 relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                  >
                    <span className="absolute flex flex-shrink-0 items-center justify-center">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusColor[item.status]}`}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-3.5 font-medium text-gray-900">{item.status}</span>
                  </a>
                </div>


              </div>
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}
