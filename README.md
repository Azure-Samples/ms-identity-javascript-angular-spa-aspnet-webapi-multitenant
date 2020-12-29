---
page_type: sample
languages:
- javascript
- typescript
- csharp
products:
- dotnet-core
- angular
- msal-angular
- ms-graph
- microsoft-identity-web
- azure-active-directory
description: "An incremental multi-tenancy tutorial demonstrating how to develop and configure your app, provision using consent and deploy it on Azure"
urlFragment: "ms-identity-javascript-angular-spa-aspnet-webapi-multitenant"
---

# Developing a multi-tenant (SaaS) application on Microsoft identity platform

This is an incremental chapterwise tutorial that teaches you how to develop a [multi-tenant](https://docs.microsoft.com/azure/active-directory/develop/single-and-multi-tenant-apps) application using the Microsoft identity platform. It'll demonstrate how to setup and configure your app, provision it in customers tenants and make it available for end users. We will also cover the steps to deploy it on **Azure** using [Azure Storage](https://docs.microsoft.com/azure/storage/blobs/storage-blobs-overview) and [Azure App Services](https://azure.microsoft.com/services/app-service/).

## How to Use this tutorial

The aim of this tutorial is for you to understand aspects of **multi-tenancy** in Azure Active Directory (Azure AD) from an *app developer's perspective*. The assumption is that you will follow each chapter in a successive fashion, as the concepts involved are built on top of the previous topic and explanations may not be repeated. Before proceeding to **Chapter 1**, you might wish to go through [Prerequisites](#prerequisites) below to get familiar with a few important terms.

## Contents

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `Chapter1`        | A multi-tenant Angular SPA signing-in users and calling MS Graph. |
| `Chapter2`        | A multi-tenant Angular SPA signing-in users and calling a protected .NET Core web API and MS Graph. |
| `Chapter3`        | Deploying this solution to Azure App Services and Azure Storage. |
| `CHANGELOG.md`    | List of changes to the sample.             |
| `CONTRIBUTING.md` | Guidelines for contributing to the sample. |
| `LICENSE`         | The license for the sample.                |

## Prerequisites

Please refer to each chapter's sub-folder for prerequisites.

We highly recommend you first getting familiar with the following *basic sign-in* examples and documents. This will help you easily grasp the various aspects that the **multi-tenant** app development scenario will present:

1. [An Angular SPA that calls the Microsoft Graph using MSAL Angular](https://github.com/Azure-Samples/ms-identity-javascript-angular-spa)
1. [An Angular SPA that signs-in users with Azure AD and calls a protected ASP.NET Core web API](https://github.com/Azure-Samples/ms-identity-javascript-angular-spa-aspnetcore-webapi)
1. [Tenancy in Azure Active Directory](https://docs.microsoft.com/azure/active-directory/develop/single-and-multi-tenant-apps)
1. [Applications and Service Principals](https://docs.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals)
1. [Azure Active Directory Consent Framework](https://docs.microsoft.com/azure/active-directory/develop/consent-framework)

> A recording of a Microsoft Identity Platform developer session that covered this topic of developing a multi-tenant app with Azure Active Directory is available at [Develop multi-tenant applications with Microsoft identity platform](https://www.youtube.com/watch?v=B416AxHoMJ4).

## Setup

Using a command line interface such as VS Code integrated terminal, clone or download this repository:

```console
  git clone https://github.com/Azure-Samples/ms-identity-javascript-angular-spa-aspnetcore-webapi.git
```

> [!NOTE] Given that the name of the sample is quite long, and so are the names of the referenced NuGet packages, you might want to clone it in a folder close to the root of your hard drive, to avoid file size limitations on Windows.

### Overview

When it comes to integrate Azure AD authentication in their apps, developers can choose to configure their app to be either **single-tenant** or **multi-tenant** while registering their app in the [Azure portal](https://portal.azure.com).

- `Single tenant` apps are only available in the tenant they were registered in, also known as their **home tenant**.
- `Multi-tenant` apps are available to users in both their home tenant and other tenants where they are **provisioned**. Apps that allow users to sign-in using their personal accounts that they use to sign into services like Xbox and Skype are also multi-tenant apps. We will cover provisioning of a multi-tenant app in other tenants using **admin-consent**, in [Chapter 1](./Chapter1/README.md).

Now let's start with [Chapter 1](./Chapter1/README.md).

## More information

For more information, visit the following links:

- Articles about the Microsoft identity platform are at [http://aka.ms/aaddevv2](http://aka.ms/aaddevv2), with a focus on:
  - [Converting an application to Multi-tenant](https://docs.microsoft.com/azure/active-directory/develop/howto-convert-app-to-be-multi-tenant)
  - [Permissions and Consent](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent)
  - [Understanding Azure AD Application Consent Experiences](https://docs.microsoft.com/azure/active-directory/develop/application-consent-experience)
  - [Understand User and Admin Consent](https://docs.microsoft.com/azure/active-directory/develop/howto-convert-app-to-be-multi-tenant#understand-user-and-admin-consent)

- To learn more about the application registration, see:
  - [Quickstart: Set up a tenant](https://docs.microsoft.com/azure/active-directory/develop/quickstart-create-new-tenant)
  - [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app)
  - [Quickstart: Configure a client application to access web APIs](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-access-web-apis)
  - [Quickstart: Configure an application to expose web APIs](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-expose-web-apis)

## Community Help and Support

Use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`msal` `dotnet` `angular` `azure-active-directory` `ms-identity`].

If you find a bug in the sample, please raise the issue on [GitHub Issues](../../issues).

To provide a recommendation, visit the following [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments
