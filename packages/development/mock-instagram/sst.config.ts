/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "mock-instagram",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "eu-west-2",
        },
      },
    };
  },
  async run() {
    const site = new sst.aws.StaticSite("MockInstagram", {
      build: {
        command: "npm run build",
        output: "dist",
      },
      domain: {
        name: "instagramdonations.aercademy.co.uk",
        // Cert is provisioned/validated via Terraform (infra/terraform/main).
        // dns lets SST manage the Route 53 alias A/AAAA record automatically
        // in the hosted zone that already exists in this AWS account.
        cert: "arn:aws:acm:us-east-1:362730983278:certificate/c85b46aa-0a8e-47f4-b7f9-38c66434300f",
        dns: sst.aws.dns(),
      },
    });

    return {
      url: site.url,
    };
  },
});
