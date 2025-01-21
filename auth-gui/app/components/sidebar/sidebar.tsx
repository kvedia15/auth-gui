
type SidebarProps = {
    handleLogout: () => void
}


export default function Sidebar( { handleLogout }: SidebarProps) {
    return (        
    <aside className="w-50 bg-gray-800 shadow-lg">
        <div className="p-6 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold transition"
            >
              Logout
            </button>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-white">Authentication Service GUI</h2>
          </div>
          <nav className="mt-6">
            <ul className="space-y-4 px-6">
              <li>
                <a
                  href="/roles"
                  className="block text-gray-300 hover:text-indigo-400 transition"
                >
                  Role
                </a>
              </li>
              <li>
                <a
                  href="#permissions"
                  className="block text-gray-300 hover:text-indigo-400 transition"
                >
                  Permissions
                </a>
              </li>
            </ul>
          </nav>

        </aside>)
}