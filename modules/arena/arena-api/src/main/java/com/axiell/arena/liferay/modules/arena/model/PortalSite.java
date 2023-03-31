package com.axiell.arena.liferay.modules.arena.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
public class PortalSite {
    private long id;
    @EqualsAndHashCode.Exclude private String name;
    @EqualsAndHashCode.Exclude private String description;
    @EqualsAndHashCode.Exclude private Group portalSiteGroup;
}
