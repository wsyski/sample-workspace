package com.axiell.arena.liferay.modules.arena.model.dto;

import com.axiell.arena.liferay.modules.arena.model.Group;
import com.axiell.arena.liferay.modules.arena.model.PortalSite;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

public class PortalSiteDTOModelMapper {

    public final static PortalSiteDTOModelMapper INSTANCE = new PortalSiteDTOModelMapper();
    private final ModelMapper dao2dtoMapper;
    private final ModelMapper dto2daoMapper;

    private final Converter<GroupDTO, Group> groupDto2group = ctx ->
            ctx.getSource() != null ? GroupDTOModelMapper.INSTANCE.toModel(ctx.getSource()) : null;

    private final Converter<Group, GroupDTO> group2GroupDto = ctx ->
            ctx.getSource() != null ? GroupDTOModelMapper.INSTANCE.toDto(ctx.getSource()) : null;


    public PortalSiteDTOModelMapper() {
        dao2dtoMapper = new ModelMapper();
        dao2dtoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        dao2dtoMapper.createTypeMap(PortalSiteDTO.class, PortalSite.class)
                .addMappings(mapper -> mapper.using(groupDto2group).map(PortalSiteDTO::getPortalSiteGroup, PortalSite::setPortalSiteGroup));
        dao2dtoMapper.validate();

        dto2daoMapper = new ModelMapper();
        dto2daoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        dto2daoMapper.createTypeMap(PortalSite.class, PortalSiteDTO.class)
                .addMappings(mapper -> mapper.using(group2GroupDto).map(PortalSite::getPortalSiteGroup, PortalSiteDTO::setPortalSiteGroup));
        dto2daoMapper.validate();
    }

    public PortalSite toModel(PortalSiteDTO dto) {
        return dao2dtoMapper.map(dto, PortalSite.class);
    }

    public PortalSiteDTO toDto(PortalSite model) {
        return dto2daoMapper.map(model, PortalSiteDTO.class);
    }

}
