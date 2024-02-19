# Providers

terraform {
  required_version = ">= 1.3.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.24.0"
    }
    vercel = {
      source = "vercel/vercel"
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

