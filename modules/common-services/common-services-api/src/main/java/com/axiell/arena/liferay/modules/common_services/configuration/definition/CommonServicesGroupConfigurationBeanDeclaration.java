package com.axiell.arena.liferay.modules.common_services.configuration.definition;

import com.axiell.arena.liferay.modules.common_services.configuration.CommonServicesGroupConfiguration;
import com.liferay.portal.kernel.settings.definition.ConfigurationBeanDeclaration;
import org.osgi.service.component.annotations.Component;

@Component
public class CommonServicesGroupConfigurationBeanDeclaration
	implements ConfigurationBeanDeclaration {

	@Override
	public Class<?> getConfigurationBeanClass() {
		return CommonServicesGroupConfiguration.class;
	}

}
