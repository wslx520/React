### containers

此目录下用来放 `容器组件`

容器组件即需要与 redux 产生交互的 react 组件。

容器组件需要引入 `react-redux` 的 `connect`，用来创建组件与 `store` 的连接

容器组件很可能需要调用 `dispatch` 方法