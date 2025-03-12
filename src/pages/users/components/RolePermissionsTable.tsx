
import DashboardCard from '@/components/dashboard/DashboardCard';
import { rolePermissions } from '../data/rolePermissions';

export default function RolePermissionsTable() {
  return (
    <DashboardCard title="Role Permissions">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-tms-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-tms-gray-500 uppercase tracking-wider">Module</th>
              {Object.keys(rolePermissions).map(role => (
                <th key={role} className="px-2 py-2 text-center text-xs font-medium text-tms-gray-500 uppercase tracking-wider">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-tms-gray-200">
            {Object.keys(rolePermissions.Operations).map(permission => (
              <tr key={permission}>
                <td className="px-2 py-2 text-sm text-tms-gray-800 capitalize">{permission}</td>
                {Object.keys(rolePermissions).map(role => (
                  <td key={`${role}-${permission}`} className="px-2 py-2 text-center">
                    {rolePermissions[role][permission] ? (
                      <div className="flex justify-center">
                        <div className="h-5 w-5 rounded-full bg-tms-green-light flex items-center justify-center">
                          <svg className="h-3 w-3 text-tms-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div className="h-5 w-5 rounded-full bg-tms-red-light flex items-center justify-center">
                          <svg className="h-3 w-3 text-tms-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
