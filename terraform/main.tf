# Providers

terraform {
  required_version = ">= 1.3.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.24.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "1.1.0"
    }
  }
  cloud {
    organization = "KDPuvvadi"

    workspaces {
      name = "puvvadi_me"
    }
  }
}

# Read data

data "cloudflare_accounts" "cloudflare_account_data" {
  name = "KD Puvvadi"
}

data "cloudflare_zones" "zone_puvvadi_me" {
  filter {
    name = "puvvadi.me"
  }
}

resource "vercel_project" "puvvadi_me_project" {
  name      = "puvvadi-me"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = "kdpuvvadi/puvvadi_me"
  }
}

resource "vercel_deployment" "puvvadi_me_deploy" {
  project_id = vercel_project.puvvadi_me_project.id
  ref        = "main"
  production = "true"

}

resource "cloudflare_record" "puvvadi_me_record" {
  zone_id         = data.cloudflare_zones.zone_puvvadi_me.zones[0].id
  name            = "@"
  value           = vercel_deployment.puvvadi_me_deploy.domains[1]
  type            = "CNAME"
  ttl             = 1
  allow_overwrite = true
  proxied         = true
}

resource "vercel_project_domain" "puvvadi_me_domain" {
  project_id = vercel_project.puvvadi_me_project.id
  domain     = "puvvadi.me"
}

output "deploy_domain" {
  value = vercel_deployment.puvvadi_me_deploy.domains
}

resource "cloudflare_record" "puvvadi_me_record_www" {
  zone_id         = data.cloudflare_zones.zone_puvvadi_me.zones[0].id
  name            = "www"
  value           = "puvvadi.me"
  type            = "CNAME"
  ttl             = 1
  allow_overwrite = true
  proxied         = true
}

resource "cloudflare_record" "puvvadi_me_record_kd" {
  zone_id         = data.cloudflare_zones.zone_puvvadi_me.zones[0].id
  name            = "kd"
  value           = "puvvadi.me"
  type            = "CNAME"
  ttl             = 1
  allow_overwrite = true
  proxied         = true
}
