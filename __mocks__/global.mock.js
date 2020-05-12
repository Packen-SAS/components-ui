export default jest.mock("global", () => ({
  ...global,
  WebSocket: function WebSocket() {}
}));