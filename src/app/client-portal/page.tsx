export default function ClientPortal() {
  // Mock project data
  const project = {
    id: 1,
    title: "E-commerce Website",
    description: "Building a responsive e-commerce platform with product catalog and payment integration",
    progress: 75,
    startDate: "2025-01-15",
    dueDate: "2025-05-15",
    status: "In Progress",
    clientName: "Fashion Boutique",
    milestones: [
      { id: 1, title: "Requirements Gathering", status: "Completed", date: "2025-01-20" },
      { id: 2, title: "Design Mockups", status: "Completed", date: "2025-02-10" },
      { id: 3, title: "Frontend Development", status: "In Progress", date: "2025-03-15" },
      { id: 4, title: "Backend Integration", status: "In Progress", date: "2025-04-01" },
      { id: 5, title: "Testing", status: "Not Started", date: "2025-04-20" },
      { id: 6, title: "Deployment", status: "Not Started", date: "2025-05-10" }
    ],
    team: [
      { id: 1, name: "Jane Smith", role: "Project Manager" },
      { id: 2, name: "John Doe", role: "Frontend Developer" },
      { id: 3, name: "Alex Johnson", role: "Backend Developer" },
      { id: 4, name: "Sarah Williams", role: "UI/UX Designer" }
    ]
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Portal</h1>
        <div className="text-sm">
          Welcome, <span className="font-medium">{project.clientName}</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {project.status}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="border rounded p-3">
            <div className="text-sm text-gray-500">Start Date</div>
            <div className="font-medium">{project.startDate}</div>
          </div>
          <div className="border rounded p-3">
            <div className="text-sm text-gray-500">Due Date</div>
            <div className="font-medium">{project.dueDate}</div>
          </div>
          <div className="border rounded p-3">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-primary-600 h-2 rounded-full" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="text-right text-xs mt-1">{project.progress}%</div>
          </div>
          <div className="border rounded p-3">
            <div className="text-sm text-gray-500">Team Size</div>
            <div className="font-medium">{project.team.length} members</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Milestones</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b text-left text-gray-500 text-sm">
                    <th className="pb-2">Milestone</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {project.milestones.map((milestone) => (
                    <tr key={milestone.id} className="border-b">
                      <td className="py-3">{milestone.title}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          milestone.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : milestone.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {milestone.status}
                        </span>
                      </td>
                      <td className="py-3">{milestone.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Provide Feedback</h3>
            <textarea 
              className="w-full border rounded-md p-2 mb-4" 
              rows={4} 
              placeholder="Enter your feedback or comments here..."
            />
            <div className="flex justify-end">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Team Members</h3>
            <ul className="space-y-3">
              {project.team.map((member) => (
                <li key={member.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Document Upload</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <p className="text-gray-500 mb-2">Drag and drop files here</p>
              <p className="text-gray-400 text-sm mb-4">or</p>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                Browse Files
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 