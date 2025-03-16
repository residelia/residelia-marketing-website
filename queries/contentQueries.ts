import { contentBlockQuery, seoQuery, linkQuery } from "./helperQueries";

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
	*[_type == "footer"]{
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
	*[_type == "navigation"]{
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
    *[_type == "page" && (_id=="homePage" || title=="Home Page")] {
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

export const featuredPostsQuery = groq`
	*[_type == "post" && featured] {
      _id,
      featured,
      excerpt,
      "slug": slug.current,
      title,
      author->{
        "slug": slug.current,
        name
      },
      "image": mainImage.asset->{url},
      category->{
        "slug": slug.current,
        name
      },
	  "publishedDate": publishedAt
    }
`;
export const postsQuery = groq`
	*[_type == "post" && language == $language] {
		_id,
		featured,
		excerpt,
		"slug": slug.current,
		title,
		author->{
			"slug": slug.current,
			name,
			"picture": picture.asset->{url},
			bio
		},
		"image": mainImage.asset->{url},
		category->{
			slug,
			name
		},
		tag->{
			slug,
			name
		},
		"publishedDate": publishedAt,
		body[]{
			...,
			markDefs[]{
				...,
				_type == "internalLink" => {
					"slug": @.reference->slug
				}
			}
		}
    }
`;

export const jobsQuery = groq`
	*[_type == "position" && active == true] {
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
	*[_type == "position" && slug[_key == $language][0].value.current == $slug] {
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

export const singlePostQuery = groq`
	*[_type == "post" && slug.current == $slug] {
		_id,
		excerpt,
		"slug": slug.current,
		title,
		author->{
			"slug": slug.current,
			name,
			"picture": picture.asset->{url},
			bio
		},
		"image": mainImage.asset->{url},
		category->{
			"slug": slug.current,
			name
		},
		"publishedDate": publishedAt,
		metaDescription,
		"tags": tags[]->{
			name,
			"slug": slug.current
		},
		body[]{
			...,
			markDefs[]{
				...,
				_type == "internalLink" => {
					"slug": @.reference->slug
				}
			}
		}
    }
`;

export const keepReadingQuery = groq`
	*[_type == "keepReading" && postsType == $type] {
      _id,
      heading,
      subHeading,
      "slug": slug.current,
      "image": image.asset->{url},
      postsType
    }
`;

export const siteQuery = groq`
{
	"slugs": {
		"pages": {
          "product": *[_type == "page" && pageType == "product"].slug.current,
          "solution": *[_type == "page" && pageType == "solution"].slug.current,
          "about": *[_type == "page" && pageType == "about"].slug.current,
          "legal": *[_type == "page" && pageType == "legal"].slug.current,
        },
		"posts": *[_type == "post"].slug.current,
	},
}
`;

export const pageQuery = groq`
    *[_type == "page" && slug[_key == $language][0].value.current == $slug] {
		title,
		description,
		slug,
		headerColor,
		pageType,
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
    *[_type == "resource" && slug[_key == $language][0].value.current == $slug] {
	  title,
	  description,
	  slug,
      "hero": hero->{
        heading,
        subHeading,
        slug,
        "buttons": callToActions[]->{
          button
        },
		heroImage,
		"imageAlt": heroImage.alt,
        "image": heroImage.asset->
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
      },
	  mainText
	}
`;

export const projectsQuery = groq`
*[(_type == "pageProjects")] | order(_updatedAt desc) [0]{
	...,
	"projects": *[_type == "project"] | order(title asc, _updatedAt desc) {
		title, slug, subtitle, titleImage{..., asset->}
	},
	${seoQuery}
}
`;

export const singleProjectQuery = groq`
*[_type == 'project' && slug.current == $slug] | order(_updatedAt desc) [0]{
	...,
	content[] {
		${contentBlockQuery}
	},
	titleImage{..., asset->},
	${seoQuery}
}
`;
