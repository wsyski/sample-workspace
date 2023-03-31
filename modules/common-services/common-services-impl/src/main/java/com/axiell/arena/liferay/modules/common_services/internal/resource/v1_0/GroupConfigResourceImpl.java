package com.axiell.arena.liferay.modules.common_services.internal.resource.v1_0;

import aQute.bnd.annotation.metatype.Meta;
import com.axiell.arena.liferay.modules.common_services.configuration.CommonServicesGroupConfiguration;
import com.axiell.arena.liferay.modules.common_services.configuration.CommonServicesSystemConfiguration;
import com.axiell.arena.liferay.modules.common_services.dto.v1_0.GroupConfig;
import com.axiell.arena.liferay.modules.common_services.resource.v1_0.GroupConfigResource;
import com.liferay.portal.kernel.module.configuration.ConfigurationProvider;
import lombok.CustomLog;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ServiceScope;

import javax.validation.constraints.NotNull;

import static com.axiell.arena.liferay.modules.common_services.constants.CommonServicesConstants.HEADER_CACHE_CONTROL;
import static com.axiell.arena.liferay.modules.common_services.constants.CommonServicesConstants.HEADER_CACHE_CONTROL_VALUE;

@Component(
        properties = "OSGI-INF/liferay/rest/v1_0/group-config.properties",
        scope = ServiceScope.PROTOTYPE, service = GroupConfigResource.class
)
@CustomLog
public class GroupConfigResourceImpl extends BaseGroupConfigResourceImpl {

    @Reference
    private ConfigurationProvider _configurationProvider;

    @Override
    public GroupConfig getGroupConfig(@NotNull Integer groupId) throws Exception {
        CommonServicesSystemConfiguration commonServicesSystemConfiguration = _configurationProvider.getSystemConfiguration(CommonServicesSystemConfiguration.class);
        CommonServicesGroupConfiguration commonServicesGroupConfiguration = _configurationProvider.getGroupConfiguration(CommonServicesGroupConfiguration.class, groupId);
        return _toGroupConfig(commonServicesSystemConfiguration, commonServicesGroupConfiguration);
    }

    protected GroupConfig _toGroupConfig(final CommonServicesSystemConfiguration commonServicesSystemConfiguration, final CommonServicesGroupConfiguration commonServicesGroupConfiguration) {
        this.contextHttpServletResponse.addHeader(HEADER_CACHE_CONTROL, HEADER_CACHE_CONTROL_VALUE);
        return new GroupConfig() {{
            calendarApiEndpoint = commonServicesSystemConfiguration.calendarApiEndpoint();
            calendarCustomerId = commonServicesGroupConfiguration.calendarCustomerId();
            calendarLocationVocabularyId = commonServicesGroupConfiguration.calendarLocationVocabularyId();
            calendarTargetAudienceVocabularyId = commonServicesGroupConfiguration.calendarTargetAudienceVocabularyId();
            calendarDefaultAllowedAttendees = commonServicesGroupConfiguration.calendarDefaultAllowedAttendees();
            federatedSearchApiEndpoint = commonServicesSystemConfiguration.federatedSearchApiEndpoint();
            federatedSearchCustomerId = commonServicesGroupConfiguration.federatedSearchCustomerId();
            federatedSearchSourceConfig = commonServicesGroupConfiguration.federatedSearchSourceConfig();
            openingHoursApiEndpoint = commonServicesSystemConfiguration.openingHoursApiEndpoint();
            openingHoursCustomerId = commonServicesGroupConfiguration.openingHoursCustomerId();
            transactionApiEndpoint = commonServicesSystemConfiguration.transactionApiEndpoint();
            transactionTenantId = commonServicesGroupConfiguration.transactionTenantId();
            googleAnalyticsMeasurementId = commonServicesGroupConfiguration.googleAnalyticsMeasurementId();
        }};
    }
}
