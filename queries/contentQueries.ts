import { contentBlockQuery, seoQuery, linkQuery } from "./helperQueries";
import groq from 'groq';

export const siteQuery1 = groq`
{
	"siteOptions": *[_id == "siteOptions"] [0] {
	...,
	footerLinks[] {
		${linkQuery}
	},
	"footer": *[_type == "footer"]{
          "logo": logo.asset->url,
          title,
          socials,
          menuesGroup[]->{
            order,
            title,
            menu[]->{
            description,
            isTextIcon,
            icon,
            libIcon,
            link{
              linkType,
              newWindow,
              "slug": internalLink->slug.current,
              "image": internalLink->image.asset->url,
              externalUrl,
              videoUrl,
              anchor,
              ...
            }
          }
        }
      },
	cookieText[]{
		${contentBlockQuery}
	},
		${seoQuery}
	},
	"headerMenues": *[_type == "menu"]
	"siteNav": *[_id == "siteNav"] [0] {
	navMain[]{
		${linkQuery}
	},
	navFooter[]{
			${linkQuery}
		},
	},
	"slugs": {
		"pages": *[_type == "page"].slug.current,
		"posts": *[_type == "post"].slug.current,
	}
}
`;

// export const localesQuery = groq`
// 	*[_type == "locales" && !(_id in path('drafts.**'))]{
// 	  	_id,
// 		localeCode,
// 		language,
// 		default,
// 		fallback,
// 		"icon": icon.asset->url
// 	}
// `;
export const localesQuery = groq`
	*[_type == "locales" && !(_id in path('drafts.**'))]{
	  	_id,
		localeCode,
		language,
		default,
		fallback,
		"icon": icon.asset->url
	}
`;

export const footQuery = groq`
	*[_type == "footer" && site == "website" && !(_id in path('drafts.**'))]{
		"logo": logo.asset->url,
		title,
		socials,
		menuesGroup[]->{
			order,
			title,
			menu[]->{
				order,
				description,
				isTextIcon,
				icon,
				libIcon,
				title,
				soon,
				next,
				"pageType":link.internalLink->pageType,
				link{
					linkType,
					newWindow,
                    "slug": coalesce(internalLink->slug, externalUrl, anchor, videoUrl),
				}
			}
		}
	}
`;

export const navQuery = groq`
	*[_type == "navigation" && site == "website" && !(_id in path('drafts.**'))]{
        ...,
		title,
		"slugs": {
			"pages": *[_type == "page"].slug,
			"posts": *[_type == "post"].slug,
		},
		demoAction {
			isIconLink,
			newWindow,
			linkType,
			linkText,
			queryString,
            "slug": coalesce(internalLink->slug, externalUrl, anchor, videoUrl),
		},
		callToAction {
			isIconLink,
			newWindow,
			linkType,
			linkText,
			queryString,
            "slug": coalesce(internalLink->slug, externalUrl, anchor, videoUrl),
		},
		accessAction {
			isIconLink,
			newWindow,
			linkType,
			"slug": coalesce(internalLink->slug, externalUrl, anchor, videoUrl),
			linkText
		},
		menuesGroup[]->{
			order,
			title,
            isMega,
			actionOrMenu,
            action{
              title,
              linkType,
              "link": {
                title,
                linkText,
                "slug": coalesce(internalLink->slug, externalUrl, anchor, videoUrl),
				"actionText": internalLink->title,
              }
            },
            menuLink->{
              title,
              description,
              isTextIcon,
			  libIcon,
              link{
                linkType,
                newWindow,
                "slug": coalesce(internalLink->slug, externalUrl, anchor, videoUrl),
              }
            },
			menu[]->{
				order,
				category,
				description,
				isTextIcon,
				icon,
				libIcon,
				title,
				soon,
				next,
				link{
					linkType,
					newWindow,
                    "slug": coalesce(internalLink->slug, externalUrl, anchor, videoUrl),
				},
				queryString
			}
		}
    }
`;

export const homeQuery = groq`
    *[_type == "page" && !(_id in path('drafts.**')) && (_id=="homePage" || title=="Home Page")] {
	  title,
	  description,
      "hero": hero->{
		title,
		slug,
		heading,
		subHeading,
		"image": heroImage.asset->,
		"imageAlt": heroImage.alt,
		"buttons": callToActions[]->{
			...,
			button{
				...,
				"link": internalLink->{slug},
			},
		},
      },
      customers[]->{
        title,
        "alt": logo.alt,
        "logoBlack": logo.asset->{
          url
        },
        "logoWhite": logoWhite.asset->{
          url
        },
      }
	}
`;


export const jobsQuery = groq`
	*[_type == "position" && !(_id in path('drafts.**')) && active == true] {
		_id,
		name,
		role,
		slug,
		publishedAt,
		linkedin,
		department->,
		jobDescription,
		location,
		mode
	}
`;

export const singleJobQuery = groq`
	*[_type == "position" && !(_id in path('drafts.**')) && slug[_key == $language][0].value.current == $slug] {
		_id,
		name,
		role,
		slug,
		publishedAt,
		linkedin,
		department->,
		jobDescription,
		location,
		mode
	}
`;


export const siteQuery = groq`
{
	"slugs": {
		"pages": {
          "product": *[_type == "page" && !(_id in path('drafts.**')) && pageType == "product"].slug.current,
          "solution": *[_type == "page" && !(_id in path('drafts.**')) && pageType == "solution"].slug.current,
          "about": *[_type == "page" && !(_id in path('drafts.**')) && pageType == "about"].slug.current,
          "legal": *[_type == "page" && !(_id in path('drafts.**')) && pageType == "legal"].slug.current,
        },
		"posts": *[_type == "post" && !(_id in path('drafts.**'))].slug.current,
	},
}
`;

export const pageQuery = groq`
    *[_type == "page" && !(_id in path('drafts.**')) && slug[_key == $language][0].value.current == $slug] {
		title,
		description,
		slug,
		headerColor,
		pageType,
		"updatedAt": _updatedAt,
		"createdAt": _createdAt,
		"hero": hero->{
			overline,
			heading,
			subHeading,
			slug,
			quote->,
			"buttons": callToActions[]->{
				...,
				button{
					...,
					"link": internalLink->{slug},
				},
			},
			soon,
			heroImage,
			"imageAlt": heroImage.alt,
			"image": heroImage.asset->
		},
		customers->{
			...,
			customersGroup[]->{
				title,
				"alt": logo.alt,
				"logoBlack": logo.asset->{
				url
				},
				"logoWhite": logoWhite.asset->{
				url
				},
			},
		},
		painAndSolution->{
          ...,
          pain{
            ...,
            "pic": image.asset->,
          },
          solution{
            ...,
            "pic": image.asset->,
          },
          "buttons": callToActions->{
              ...,
              button{
                ...,
                "link": internalLink->{slug},
              },
          },
        },
		problem->{
			"pic": image.asset->,
			"buttons": callToActions[]->{
				...,
				button{
					...,
					"link": internalLink->{slug},
				},
			},
			...
		},
		stats->{
			"statGroup": statsGroup[]->,
			...
		},
		useCases->{
			"pic": image.asset->,
			"useCaseGroup": useCasesGroup[]->,
			...
		},
		benefits->{
			"benefits": benefitsGroup[]->,
			...
		},
		features->{
			"features": featuresGroup[]->,
			...
		},
		workflow->{
			"wfSteps": workflowSteps[]->{
				"pic": image.asset->,
				"cta": action2[]{
					...,
					"link": button.internalLink->{slug},
				},
				...
			},
			...
		},
		fullSuite->{
			"suite": products[]->{
				"pic": image.asset->,
				...
			},
			...
		},
		enterprise->{
			"benefits": benefitsGroup[]->,
			...
		},
		dashboard->{
			"pic": image.asset->,
			...
		},
		testimonials->{
			"testimonials": testimonialsGroup[]->{
				"pic": image.asset->,
				...
			},
			...
		},
		callToAction->{
			"link": button.internalLink->,
			...
		},
		form->{
			"formu": form->,
			...
	  	},
		mission[]->{
          ...
        },
		people->{
          ...,
		  callToAction->{
            "link": button.internalLink->,
            ...
          },
          team[]->{
            ...,
            "pic": image.asset->,
          },
        },
		whyUs->{
          "pic": image.asset->,
          ...
        },
		"content": mainText[_key == $language][0].value.content[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
                "slug": @.reference->slug
            }
          }
        },
		plans->{
          ...,
          pricingPlans[]->{
            ...,
            callToAction {
              ...,
              "link": internalLink->
            },
          },
        },
		"priceTableGeneral": planComparisionGeneral[_key == $language][0].value,
		"priceTableExplorer": planComparisionExplorer[_key == $language][0].value,
		"priceTableValuation": planComparisionValuation[_key == $language][0].value,
        "priceTableLegal": planComparisionLegal[_key == $language][0].value,
        "priceTableManagement": planComparisionManagement[_key == $language][0].value,
        "priceTableMaintenance": planComparisionMaintenance[_key == $language][0].value,
        "priceTableBroker": planComparisionBroker[_key == $language][0].value,
	}
`;

export const resourceQuery = groq`
    *[_type == "resource" && !(_id in path('drafts.**')) && slug[_key == $language][0].value.current == $slug] {
      title,
      description,
      slug,
      type,
      hasForm,
      "heroOverline": heroOverline,
      "heroImage": heroImage.asset->{ url, metadata{ lqip, dimensions } },
      "heroImageAlt": heroImage.alt,
      "whatWillYouFind": whatWillYouFind{
        heading,
        showCta,
        ctaText,
        "bullets": bullets[]{
          "text": text
        },
        "previewImages": previewImages[]{
          "url": asset->url,
          "alt": alt
        }
      },
      "whyItMatters": whyItMatters{
        overline,
        heading,
        showCta,
        ctaText,
        "body": body[_key == $language][0].value.content[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug
            }
          }
        },
        "image": image.asset->{ url },
        "imageAlt": image.alt
      },
      "keyPoints": keyPoints{
        overline,
        heading,
        subHeading,
        showCta,
        ctaText,
        "points": points[]{
          icon,
          isMDI,
          heading,
          subHeading
        }
      },
      "customers": customers->{
        title,
        "customers": customers[]->{
          title,
          "alt": logo.alt,
          "logoBlack": logo.asset->{ url },
          "logoWhite": logoWhite.asset->{ url }
        }
      },
      "testimonials": testimonials->{
        heading,
        subHeading,
		"testimonials": testimonialsGroup[]->{
			"pic": image.asset->,
			...
		}
      },
      "callToAction": callToAction->{
        upperHeading,
        heading,
        button{
          linkType,
          linkText,
          queryString,
          "slug": coalesce(internalLink->slug, externalUrl)
        }
      },
      mainText
    }
`;

export const resourcesListQuery = groq`
  *[_type == "resource" && !(_id in path('drafts.**')) && type == $resourceType] | order(_createdAt desc) {
    title,
    description,
    slug,
    "image": heroImage.asset->{url, metadata{lqip, dimensions}},
    "imageAlt": heroImage.alt
  }
`;

export const projectsQuery = groq`
*[(_type == "pageProjects") && !(_id in path('drafts.**'))] | order(_updatedAt desc) [0]{
	...,
	"projects": *[_type == "project" && !(_id in path('drafts.**'))] | order(title asc, _updatedAt desc) {
		title, slug, subtitle, titleImage{..., asset->}
	},
	${seoQuery}
}
`;

export const singleProjectQuery = groq`
*[_type == 'project' && !(_id in path('drafts.**')) && slug.current == $slug] | order(_updatedAt desc) [0]{
	...,
	content[] {
		${contentBlockQuery}
	},
	titleImage{..., asset->},
	${seoQuery}
}
`;
