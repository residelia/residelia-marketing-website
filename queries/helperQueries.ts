export const linkQuery = `
	_type == "internalLink" => {
		"linkType": "internalLink",
		"title": coalesce( title,
			linkTarget->title
		),
		"route": select(
			linkTarget->_type == "Homepage" => "index",
			linkTarget->_type == "pageProjects" => "projects",
			linkTarget->_type == "page" => "slug",
			linkTarget->_type == "post" => "projects-slug",
			"index"
		),
		"slug": linkTarget->slug.current
	},
	_type == "link" => {
		...,
		"linkType": "externalLink",
		"title": coalesce(title, href)
	}
`;

export const contentBlockQuery = `
	_type == "block" => {
		...
	},
	_type == "picture" || _type == "pictureTitled" => {
		_type,
		"image": {..., asset->}
	},
	_type == "video" || _type == "videoPlayer" => {
		_type,
		"video": {muxVideo{..., asset->}},
		posterImage {..., asset->}
	},
	markDefs[]{
		...,
		_type == "download" => {"url": asset->url},
		${linkQuery}
	}
`;

export const jobBenefitsQuery = `
	*[_type == "benefits" && domain == 'job'] {
		_id,
		heading,
		subheading,
		content,
		benefitsGroup[]->{
          heading,
          ...
        }
	}
`

export const formSectionQuery = `
	*[_type == "form" && form->type == $formType] {
      heading,
      subheading,
      title,
      form->
	}
`
export const formBlockQuery = `
	*[_type == "formBlock" && type == $formType] {
		title,
        description,
        inputs,
        success,
        error,
        action,
        submitting,
        ...
	}
`
export const cookieSettingsModalQuery = `
	*[_type == "cookieSettingsModal"] {
		...,
		categories[]-> {
			...,
			cookies[]->
		}
	}
`

export const cookieBannerQuery = `
	*[_type == "cookieBanner"] {
	...
	}
`

export const seoQuery = `
	seo {
		...,
		ogImage{asset->}
	}
`;
