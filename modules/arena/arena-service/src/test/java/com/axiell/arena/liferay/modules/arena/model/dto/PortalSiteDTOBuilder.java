package com.axiell.arena.liferay.modules.arena.model.dto;

public class PortalSiteDTOBuilder {
    public static final long ID = 4000L;
    public static final String NAME = "Portal Site Name";
    public static final String DESCRIPTION = "Portal Site Description";
    private long id = ID;
    private String name = NAME;
    private String description = DESCRIPTION;
    private GroupDTO portalSiteGroup = GroupDTOBuilder.create().build();


    public static PortalSiteDTOBuilder create() {
        return new PortalSiteDTOBuilder();
    }

    public PortalSiteDTOBuilder id(final long id) {
        this.id = id;
        return this;
    }

    public PortalSiteDTOBuilder name(final String name) {
        this.name = name;
        return this;
    }

    public PortalSiteDTOBuilder description(final String description) {
        this.description = description;
        return this;
    }

    public PortalSiteDTOBuilder portalSiteGroup(final GroupDTO portalSiteGroup) {
        this.portalSiteGroup = portalSiteGroup;
        return this;
    }

    public PortalSiteDTO build() {
        PortalSiteDTO portalSiteDTO = new PortalSiteDTO();
        portalSiteDTO.setId(this.id);
        portalSiteDTO.setName(this.name);
        portalSiteDTO.setDescription(this.description);
        portalSiteDTO.setPortalSiteGroup(this.portalSiteGroup);
        return portalSiteDTO;
    }
}
