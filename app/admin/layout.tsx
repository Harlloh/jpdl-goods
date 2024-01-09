import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "E-shop Admin",
  description: "E-shop Admin Dashboard",
};
function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <AdminNav />
      </div>
      {children}
    </div>
  );
}

export default AdminLayout;
