export const isMobile = (ctx) => {
    const isMobileView = (ctx.req
      ? ctx.req.headers["user-agent"]
      : navigator.userAgent
    ).match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
    return Boolean(isMobileView)
}