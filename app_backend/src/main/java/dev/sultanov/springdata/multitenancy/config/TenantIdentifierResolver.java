package dev.sultanov.springdata.multitenancy.config;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import dev.sultanov.springdata.multitenancy.entity.Users;

import java.security.Principal;
import java.util.Optional;
import java.util.function.Predicate;

@Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver {

    static final String DEFAULT_TENANT = "default";

    @Override
    public String resolveCurrentTenantIdentifier() {
    	try {
    		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    		Users currentUserName = (Users) authentication.getPrincipal();
    		return currentUserName.getTenant();

    	} catch (Exception e) {
    		return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
    				.filter(Predicate.not(authentication -> authentication instanceof AnonymousAuthenticationToken))
    				.map(Principal::getName).orElse(DEFAULT_TENANT);
    	}
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        return true;
    }
}