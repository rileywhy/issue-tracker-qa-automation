package com.riley.issuetracker;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Ticket {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    private String assignee;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @CreationTimestamp
    private LocalDateTime updatedAt;

    public Ticket(){

    }

    public Ticket(
            Long id,
            String title,
            String description,
            Status status,
            Priority priority,
            String assignee
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.assignee = assignee;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Status getStatus() {
        return status;
    }

    public Priority getPriority() {
        return priority;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setTitle(String title) {
    this.title = title;
    }
    public void setDescription(String description)
    {
        this.description = description;

    }
    public void setStatus(Status status)
    {
        this.status = status;
    }
    public void setPriority(Priority priority)
    {
        this.priority = priority;
    }

    public void setAssignee(String assignee)
    {        this.assignee = assignee;
    }
    public LocalDateTime getCreatedAt() {
    return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
            return updatedAt;
    }




    
}