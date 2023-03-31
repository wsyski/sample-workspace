package com.axiell.arena.liferay.modules.arena.model.dto;

import com.axiell.arena.liferay.modules.arena.model.Group;
import com.axiell.arena.liferay.modules.arena.model.AgencyMember;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

public class AgencyMemberDTOModelMapper {

    public final static AgencyMemberDTOModelMapper INSTANCE = new AgencyMemberDTOModelMapper();
    private final ModelMapper dao2dtoMapper;
    private final ModelMapper dto2daoMapper;

    private final Converter<GroupDTO, Group> groupDto2group = ctx ->
            ctx.getSource() != null ? GroupDTOModelMapper.INSTANCE.toModel(ctx.getSource()) : null;

    private final Converter<Group, GroupDTO> group2GroupDto = ctx ->
            ctx.getSource() != null ? GroupDTOModelMapper.INSTANCE.toDto(ctx.getSource()) : null;


    public AgencyMemberDTOModelMapper() {
        dao2dtoMapper = new ModelMapper();
        dao2dtoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        dao2dtoMapper.createTypeMap(AgencyMemberDTO.class, AgencyMember.class)
                .addMappings(mapper -> mapper.using(groupDto2group).map(AgencyMemberDTO::getMainGroup, AgencyMember::setAgencyMemberGroup));
        dao2dtoMapper.validate();

        dto2daoMapper = new ModelMapper();
        dto2daoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        dto2daoMapper.createTypeMap(AgencyMember.class, AgencyMemberDTO.class)
                .addMappings(mapper -> mapper.using(group2GroupDto).map(AgencyMember::getAgencyMemberGroup, AgencyMemberDTO::setMainGroup));
        dto2daoMapper.validate();
    }

    public AgencyMember toModel(AgencyMemberDTO dto) {
        return dao2dtoMapper.map(dto, AgencyMember.class);
    }

    public AgencyMemberDTO toDto(AgencyMember model) {
        return dto2daoMapper.map(model, AgencyMemberDTO.class);
    }

}
