export default function Dashboard() {
  // Mock data for demonstration
  const projects = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "Building a responsive e-commerce platform with product catalog and payment integration",
      progress: 75,
      dueDate: "2025-05-15",
      clientName: "Fashion Boutique"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Developing a secure mobile banking application with transaction history and bill payments",
      progress: 45,
      dueDate: "2025-06-20",
      clientName: "FinTech Solutions"
    },
    {
      id: 3,
      title: "CRM System Upgrade",
      description: "Upgrading the existing CRM system with new features and improved user interface",
      progress: 30,
      dueDate: "2025-07-10",
      clientName: "Business Corp"
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Active Projects</h2>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Upcoming Deadlines</h2>
          <p className="text-3xl font-bold">2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Hours Logged This Week</h2>
          <p className="text-3xl font-bold">87</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Projects Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Project</th>
                <th className="py-3 px-4 text-left">Client</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Progress</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{project.title}</td>
                  <td className="py-3 px-4">{project.clientName}</td>
                  <td className="py-3 px-4">{project.dueDate}</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{project.progress}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary-600 hover:text-primary-800">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <div className="bg-white rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            <li className="p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <span>New comment on E-commerce Website</span>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <span>Task completed: Design homepage mockup</span>
                <span className="text-gray-500 text-sm">Yesterday</span>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <span>New task assigned: Implement payment gateway</span>
                <span className="text-gray-500 text-sm">Apr 23, 2025</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 