const WebGLContextManager = {
  activeContexts: 0,
  maxContexts: 4,

  requestContext(): boolean {
    if (this.activeContexts < this.maxContexts) {
      this.activeContexts++;
      return true;
    }
    return false;
  },

  releaseContext(): void {
    if (this.activeContexts > 0) {
      this.activeContexts--;
    }
  },

  resetContexts(): boolean {
    this.activeContexts = 0;
    return true;
  },
};

export default WebGLContextManager;
