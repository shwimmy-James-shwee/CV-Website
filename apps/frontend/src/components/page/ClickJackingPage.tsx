function ClickJackingPage() {
  return (
    <div data-testid='click-jacking-page'>
      <h2 style={{ color: 'red' }}>
        IMPORTANT!!! If you're viewing this page, it indicates that the Web App link you've just clicked is currently
        under a serious click jacking security breach.
      </h2>
      <h3>
        Your immediate action is needed. Please inform the team immediately and provide them with the reference of the
        application from which you accessed this link. For your safety, access the WebApp using &nbsp;
        <a
          style={{ color: 'red', textDecoration: 'none' }}
          href={window.self.location.href}
          title='Web Application'
          target='blank'
        >
          this secure link
        </a>
        .&nbsp; Your quick response is crucial to upholding our security measures.
      </h3>
    </div>
  );
}
export default ClickJackingPage;
