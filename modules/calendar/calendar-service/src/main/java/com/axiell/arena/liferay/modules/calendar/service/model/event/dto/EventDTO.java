package com.axiell.arena.liferay.modules.calendar.service.model.event.dto;

import com.axiell.arena.liferay.modules.calendar.model.event.Attachment;
import com.axiell.arena.liferay.modules.calendar.model.event.Image;
import com.axiell.arena.liferay.modules.calendar.model.event.Location;
import com.axiell.arena.liferay.modules.calendar.model.event.Status;
import com.axiell.arena.liferay.modules.calendar.model.event.TargetAudience;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class EventDTO {
    private String id;
    private String createdBy;
    private String customerId;
    private boolean deleted;
    private boolean registerable;
    private String title;
    private String description;
    private Instant createdDate;
    private Instant modifiedDate;
    private Instant startDate;
    private Instant endDate;
    private Instant seriesInitialStart;
    private Instant seriesInitialEnd;
    private Instant publicationDate;
    private RecurringDTO recurring;
    private String modifiedBy;


    private String status = Status.DRAFT.name();
    private int nrOfAttendees;
    private int maxAttendees;
    private int nrAttended;
    private int maxNrPerRegistration;
    private Location location;
    private Location room;
    private List<Image> images = new ArrayList<>();
    private List<Attachment> attachments = new ArrayList<>();
    private List<String> types = new ArrayList<>();
    private List<String> subjects = new ArrayList<>();
    private List<String> tags = new ArrayList<>();
    private List<TargetAudience> targetAudiences = new ArrayList<>();
    private List<String> linkedCatalogueRecordIds = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public boolean isRegisterable() {
        return registerable;
    }

    public void setRegisterable(boolean registerable) {
        this.registerable = registerable;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(final String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(final Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getSeriesInitialStart() {
        return seriesInitialStart;
    }

    public void setSeriesInitialStart(Instant seriesInitialStart) {
        this.seriesInitialStart = seriesInitialStart;
    }

    public Instant getSeriesInitialEnd() {
        return seriesInitialEnd;
    }

    public void setSeriesInitialEnd(Instant seriesInitialEnd) {
        this.seriesInitialEnd = seriesInitialEnd;
    }

    public Instant getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Instant publicationDate) {
        this.publicationDate = publicationDate;
    }

    public RecurringDTO getRecurring() {
        return recurring;
    }

    public void setRecurring(RecurringDTO recurring) {
        this.recurring = recurring;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getNrOfAttendees() {
        return nrOfAttendees;
    }

    public void setNrOfAttendees(int nrOfAttendees) {
        this.nrOfAttendees = nrOfAttendees;
    }

    public int getMaxAttendees() {
        return maxAttendees;
    }

    public void setMaxAttendees(int maxAttendees) {
        this.maxAttendees = maxAttendees;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Location getRoom() {
        return room;
    }

    public void setRoom(Location room) {
        this.room = room;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images == null ? new ArrayList<>() : images;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments == null ? new ArrayList<>() : attachments;
    }

    public List<String> getTypes() {
        return types == null ? new ArrayList<>() : types;
    }

    public void setTypes(final List<String> types) {
        this.types = types;
    }

    public List<String> getSubjects() {
        return subjects;
    }

    public void setSubjects(final List<String> subjects) {
        this.subjects = subjects == null ? new ArrayList<>() : subjects;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags == null ? new ArrayList<>() : tags;
    }

    public List<TargetAudience> getTargetAudiences() {
        return targetAudiences;
    }

    public void setTargetAudiences(final List<TargetAudience> targetAudiences) {
        this.targetAudiences = targetAudiences == null ? new ArrayList<>() : targetAudiences;
    }

    public List<String> getLinkedCatalogueRecordIds() {
        return linkedCatalogueRecordIds;
    }

    public void setLinkedCatalogueRecordIds(final List<String> linkedCatalogueRecordIds) {
        this.linkedCatalogueRecordIds = linkedCatalogueRecordIds == null ? new ArrayList<>() : linkedCatalogueRecordIds;
    }

    public int getNrAttended() {
        return nrAttended;
    }

    public void setNrAttended(int nrAttended) {
        this.nrAttended = nrAttended;
    }

    public int getMaxNrPerRegistration() {
        return maxNrPerRegistration;
    }

    public void setMaxNrPerRegistration(int maxNrPerRegistration) {
        this.maxNrPerRegistration = maxNrPerRegistration;
    }
}
