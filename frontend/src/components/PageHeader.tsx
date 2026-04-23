type PageHeaderProps = {
  title: string;
  subtitle: string;
};

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </div>
  );
}

export default PageHeader;