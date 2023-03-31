package com.axiell.arena.liferay.modules.common_services.configuration.definition;

import com.axiell.arena.liferay.modules.common_services.configuration.CommonServicesSystemConfiguration;
import com.liferay.portal.kernel.settings.definition.ConfigurationBeanDeclaration;
import org.osgi.service.component.annotations.Component;

@Component
public class CommonServicesSystemConfigurationBeanDeclaration implements ConfigurationBeanDeclaration {

	@Override
	public Class<?> getConfigurationBeanClass() {
		return CommonServicesSystemConfiguration.class;
	}

}
