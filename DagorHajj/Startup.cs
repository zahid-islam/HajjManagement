﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DagorHajj.Startup))]
namespace DagorHajj
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
