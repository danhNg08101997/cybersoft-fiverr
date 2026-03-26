function AppLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <p className="text-sm font-medium text-slate-600">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
}

export default AppLoader;