# AI 大模型

AI 助手支持接入任意 **OpenAI 兼容** 或 **Anthropic 兼容** 的服务，包括官方 API、各类聚合网关与本地部署的推理服务（如 Ollama、LM Studio）。

## 支持的协议

| 协议 | 适用场景 |
| --- | --- |
| OpenAI Chat Completions | 绝大多数兼容服务 |
| OpenAI Responses | OpenAI 新版接口 |
| Anthropic Messages | Claude 系列及兼容网关 |

## 获取配置信息

- **官方服务**：在 OpenAI / Anthropic 等平台的控制台创建 API Key；
- **聚合网关**：按网关文档获取 Base URL 与 Key；
- **本地服务**：开启 Ollama / LM Studio 的 API 服务，Base URL 通常为 `http://127.0.0.1:11434/v1` 这类地址。

## 在 Moodiary 中配置

进入 **设置 → AI 助手 → 服务商**，新建一个服务商：

| 字段 | 说明 |
| --- | --- |
| 名称 | 自定义，用于区分多个服务商 |
| 协议 | 上表中的三种之一 |
| 基础地址 | 预设服务商已锁定，自建服务需手动填写 |
| API Key | 服务商提供的密钥 |
| 默认模型 | 对话使用的模型 |
| 模型列表 | 可手动添加，或从服务商拉取 |

还可以为该服务商开启能力开关：

- **工具调用**（Tool Call）：允许助手检索与操作日记；
- **推理**（Reasoning）：显示思维链；
- **附件**（视觉）：允许发送图片。

::: tip 预设
应用内置了常见服务商预设（来自 [models.dev](https://models.dev/) 的公开目录，缓存 24 小时）。选择预设后只需填入 API Key。
:::

## 不想联网？

可以改用完全离线的[本地模型](/guide/assistant#2-完全离线的本地模型)，在设置中下载后即可使用，无需任何密钥。

## 隐私

发送给助手的上下文只会到达你配置的服务商。密钥保存在系统安全存储中，不会随[备份](/guide/export-import#备份)迁移。
