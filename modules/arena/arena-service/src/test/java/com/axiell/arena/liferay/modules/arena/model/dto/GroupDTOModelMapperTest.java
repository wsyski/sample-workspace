package com.axiell.arena.liferay.modules.arena.model.dto;

import com.axiell.arena.liferay.modules.arena.model.Group;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

public class GroupDTOModelMapperTest {
    private GroupDTOModelMapper underTest = new GroupDTOModelMapper();

    @Test
    public void toModel() {
        GroupDTO groupDTO = GroupDTOBuilder.create().build();
        Group result = underTest.toModel(groupDTO);
        assertThat(result, is(notNullValue()));
        assertThat(result.getName(), is(GroupDTOBuilder.NAME));
    }

    @Test
    public void toDto() {
        GroupDTO groupDTO = GroupDTOBuilder.create().build();
        Group group = underTest.toModel(groupDTO);
        GroupDTO result = underTest.toDto(group);
        assertThat(result, is(notNullValue()));
        assertThat(result.getName(), is(GroupDTOBuilder.NAME));
    }
}
