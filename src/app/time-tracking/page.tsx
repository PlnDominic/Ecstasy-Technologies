export default function TimeTracking() {
  // Mock data for time entries
  const timeEntries = [
    { id: 1, project: "E-commerce Website", task: "Homepage design", date: "2025-04-22", hours: 3.5, developer: "John Doe" },
    { id: 2, project: "E-commerce Website", task: "Cart functionality", date: "2025-04-23", hours: 5, developer: "John Doe" },
    { id: 3, project: "Mobile Banking App", task: "API integration", date: "2025-04-23", hours: 4, developer: "Alex Johnson" },
    { id: 4, project: "Mobile Banking App", task: "Login screen", date: "2025-04-24", hours: 2.5, developer: "Sarah Williams" },
    { id: 5, project: "CRM System", task: "Database schema", date: "2025-04-24", hours: 6, developer: "Alex Johnson" }
  ];

  // Calculate statistics
  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const avgHoursPerDay = totalHours / [...new Set(timeEntries.map(entry => entry.date))].length;
  const developerStats = timeEntries.reduce((stats, entry) => {
    if (!stats[entry.developer]) {
      stats[entry.developer] = 0;
    }
    stats[entry.developer] += entry.hours;
    return stats;
  }, {} as Record<string, number>);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Time Tracking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Total Hours</h2>
          <p className="text-3xl font-bold">{totalHours}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Avg. Hours/Day</h2>
          <p className="text-3xl font-bold">{avgHoursPerDay.toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Projects</h2>
          <p className="text-3xl font-bold">{new Set(timeEntries.map(entry => entry.project)).size}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Team Members</h2>
          <p className="text-3xl font-bold">{Object.keys(developerStats).length}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Log Time</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50">
                <option>Select a project</option>
                <option>E-commerce Website</option>
                <option>Mobile Banking App</option>
                <option>CRM System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
              <input 
                type="text" 
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50" 
                placeholder="What did you work on?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
              <input 
                type="number" 
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50" 
                min="0.5"
                step="0.5"
              />
            </div>
          </div>
          <div className="text-right">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
              Log Time
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Time Entries</h2>
          <div>
            <button className="text-primary-600 hover:text-primary-800">
              View All
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Developer
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.task}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.hours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.developer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 