---
page_type: sample
author: derisen
languages:
- javascript
- typescript
- csharp
products:
- angular
- dotnet
- azure-active-directory
- microsoft-graph-api
- azure-app-services
- azure-storage
description: "Deploying a Multi-tenant (SaaS) Angular Single-page Application (SPA) that Authenticates users with Azure AD and calls a protected ASP.NET Core web API"
urlFragment: "ms-identity-javascript-angular-spa-aspnet-webapi-multitenant/Chapter3"
---

# Deploying a Multi-tenant (SaaS) Angular Single-page Application (SPA) that Authenticates users with Azure AD and calls a protected ASP.NET Core web API

In this guide, we will deploy our project components, **TodoListAPI** and **TodoListSPA**, to Azure Cloud. For **TodoListAPI**, we will use **Azure App Services**, while for **TodoListSPA**, we will generate a static website and upload it to **Azure Storage**.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) must be installed to run this sample.
- [Dotnet Core SDK](https://dotnet.microsoft.com/download) must be installed to run this sample.
- [Angular-CLI](https://cli.angular.io/) must be installed **globally** to run this sample.
- *At least* **two** Azure Active Directory (Azure AD) tenants if you want to test deployment end-to-end. For more information on how to get an Azure AD tenant, see [How to get an Azure AD tenant](https://azure.microsoft.com/documentation/articles/active-directory-howto-tenant/).
- On each tenant, *at least* **one** admin account and **one** non-admin/user account for testing purposes.
- An **Azure subscription**. This sample uses **Azure App Services** and **Azure Storage**.
- A modern Browser. This sample uses **ES6** conventions and will not run on **Internet Explorer**.
- We recommend [VS Code](https://code.visualstudio.com/download) for running and debugging this cross-platform application.
- We recommend [Azure Tools for VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) for interacting with Azure services directly within VS Code.

## Setup

We will use the same project, TodoListSPA and TodoListAPI from **Chapter 2**. Simply make a copy of the folder **Chapter2** and open it with VS Studio Code. Then, using a command line interface such as VS Code integrated terminal, follow the steps below:

### Step 1. Install .NET Core API dependencies

```console
    cd TodoListAPI
    dotnet restore
```

### Step 2. Install Angular SPA dependencies

```console
    cd ../
    cd TodoListSPA
    npm install
```

## Registration

### Register the service app (TodoListAPI)

Use the same app registration credentials that you've obtained during **chapter 2**.

### Register the client app (TodoListSPA)

Use the same app registration credentials that you've obtained during **chapter 2**.

> If you want to deploy *just* your SPA, you may also use the registration credentials that you've obtained during **chapter 1**.

## Deployment

### TodoListAPI

We will deploy our web API on [Azure App Services](https://azure.microsoft.com/services/app-service/).

Using a command line interface such as VS Code integrated terminal, follow the steps below:

#### Step 1. Initialize a local Git

If you don't have a folder initialized for Git already, type:

```console
    git init
```

Once the initialization is done, commit all your files to your local Git. On Visual Studio Code, you can use the **Source Control** panel on the left bar for this.

#### Step 2. Modify your launchSettings.json

1. Open the `TodoListAPI\Properties\launchSettings.json` file.
2. Find all app keys `applicationUrl` and replace it with the base address of your web API e.g. `my-web-api.azurewebsites.net`.
3. Find the app key `launchUrl` and replace it with the API endpoint of your web API e.g. `my-web-api.azurewebsites.net/api/todolist`.

#### Step 3. Deploy your app

Click on the Azure icon on the left bar in VS Code. Hover your mouse cursor to **App Service** section and you will see an upward-facing arrow icon. Click on it publish your local files in the `TodoListAPI` folder to **Azure App Services**.

Click "Add Config" if a popup dialog displays regarding configuration to deploy. Choose **Create new Web App** and give it a name, or choose an existing one from the options under **Select Web App**.

![publish](../Misc/ch3_publish.png)

#### Step 4. Configure your app

On the **App Services** portal, click on the **Configuration** blade and set the **stack** property to **.NET Core**.

![config](../Misc/ch3_config.png)

#### Step 5. Disabling Azure AD authentication

Still on the **App Services** portal, click on the **Authentication/Authorization** blade. There, make sure that the **App Services Authentication** is switched off (and nothing else is checked), as we are using our own authentication logic.  

![auth1](../Misc/ch3_auth.png)

### TodoListSPA

Since TodoListSPA is a single-page application, we will deploy it as a **static website** on [Azure Storage](https://azure.microsoft.com/services/storage/). To do so, we will **build** our Angular sample to create a `dist/<your-project-name>` folder with the compiled resources. Once done, We will upload this `dist/<your-project-name>` folder only (and not the entire `dist/` folder).

> A video tutorial covering this process can be found [here](https://docs.microsoft.com/azure/javascript/tutorial-vscode-static-website-node-01).

Using a command line interface such as VS Code integrated terminal, locate the `TodoListSPA folder`, then follow the steps below:

#### Step 1. Create storage account

On VS Code, click on the Azure Tools icon on the left bar. Then, find the Storage section, and click on one of your subscriptions to create a storage account.

![storage-account](../Misc/ch3_storage_account.png)

#### Step 2. Build your app

```console
    ng build --prod
```

#### Step 3. Deploy static website

Right-click on the newly created `dist/<your-project-name>` folder and a context-menu will appear with the option "Deploy to static website".

![deploy-static](../Misc/ch3_deploy_static.png)

You may be prompted you to sign in to Azure, providing a link to open in your browser and a code to paste in the login page. Once deployment is done, a popup on the right corner of VS Code will appear to let you know the URL of the website you've just deployed.

#### Step 4. Register your new address as a redirect uri

You now need to go back to your Azure AD **app registration** for `TodoListSPA`:

   1. Click on the **Authentication** blade.
   2. Add your website's address (e.g. `https://angular9-todo-app52.z22.web.core.windows.net/`) as a new **Redirect URI**.

#### Step 5. Modify app-config.json

1. Open the `TodoListSPA\src\app\app-config.json` file
1. Find the key `todoListApi.redirectUri` and replace the existing value with the **Redirect Uri** that you've just registered in the previous step.
1. Find the key `todoListApi.resourceScope` and replace the existing value with the **Redirect Uri** that you've just obtained in deploying TodoListAPI (e.g. my-web-api.azurewebsites.net)
1. Re-build and re-deploy your files:

```console
    ng build --prod
```

Right-click on the newly created `dist/<your-project-name>` folder and select "Deploy to static website" from the context-menu. You should now be able to authenticate to your SPA and call your web API.

## Discussion

Here we discuss some of the more important aspects of deploying multi-tenant application suites.

### CORS Configuration

In the previous chapter, we have set up our own [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) configuration in the **TodoListAPI** (`TodoListAPI/Startup.cs`):

```csharp
        public void ConfigureServices(IServiceCollection services)
        {
            // Allowing CORS for all domains and methods for the purpose of sample
            // Note: this is not secure and shouldn't be used in production
            services.AddCors(o => o.AddPolicy("default", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("default");
        }
```

> [!NOTE] In a real-world scenario, you should be selective with allowed origins i.e. you should allow only trusted domains. For production, you would specify the url of the production client app: for instance, if your client app is hosted at "http://example.com" then the configuration would be: `builder.WithOrigins("http://example.com")`

If you like, you could delegate the control of **CORS** policy to **Azure App Services**. To do so, navigate to **App Services** portal, and then click on the **CORS** blade:

![cors](../Misc/ch3_cors.png)

Then, you can add the domain of your single-page application as an **Allowed Origin**. Of course, if you follow this approach, don't forget to remove the CORS configuration in the `TodoListAPI/Startup.cs` (i.e. the code snipped above), as you no longer need it once you set up **Azure App Services** to enforce the **CORS** policy.

> [!NOTE] Did the sample not work for you as expected? Did you encounter issues trying this sample? Then please reach out to us using the [GitHub Issues](../issues) page.

## More information

- [Quickstart: Create an ASP.NET Core web app in Azure](https://docs.microsoft.com/azure/app-service/app-service-web-get-started-dotnet)
- [Tutorial: Authenticate and authorize users end-to-end in Azure App Service](https://docs.microsoft.com/azure/app-service/app-service-web-tutorial-auth-aad)
- [Authentication and authorization in Azure App Service and Azure Functions](https://docs.microsoft.com/azure/app-service/overview-authentication-authorization)
- [Configure your App Service or Azure Functions app to use Azure AD login](https://docs.microsoft.com/azure/app-service/configure-authentication-provider-aad)

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
