import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DragDropModule } from 'primeng/dragdrop';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface Task {
    id: number;
    title: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
}

@Component({
    selector: 'app-drag-drop-examples',
    standalone: true,
    imports: [
        CommonModule,
        FileUploadModule,
        DragDropModule,
        CardModule,
        ButtonModule,
        TagModule,
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './drag-drop-examples.component.html',
    styleUrl: './drag-drop-examples.component.scss'
})
export class DragDropExamplesComponent {
    uploadedFiles: any[] = [];
    todoTasks: Task[] = [
        { id: 1, title: 'Design new homepage', status: 'todo', priority: 'high' },
        { id: 2, title: 'Update documentation', status: 'todo', priority: 'medium' },
        { id: 3, title: 'Review pull requests', status: 'todo', priority: 'low' }
    ];
    inProgressTasks: Task[] = [
        { id: 4, title: 'Implement user authentication', status: 'in-progress', priority: 'high' },
        { id: 5, title: 'Optimize database queries', status: 'in-progress', priority: 'medium' }
    ];
    doneTasks: Task[] = [
        { id: 6, title: 'Setup CI/CD pipeline', status: 'done', priority: 'high' },
        { id: 7, title: 'Write unit tests', status: 'done', priority: 'medium' }
    ];

    constructor(private messageService: MessageService) { }

    onUpload(event: any) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

    onDragStart(event: any, task: Task) {
        event.dataTransfer.setData('text/plain', JSON.stringify(task));
    }

    onDragOver(event: any) {
        event.preventDefault();
    }

    onDrop(event: any, targetStatus: Task['status']) {
        event.preventDefault();
        const taskData = JSON.parse(event.dataTransfer.getData('text/plain'));
        const task: Task = taskData;

        // Remove from original list
        this.removeTaskFromList(task);

        // Add to target list
        task.status = targetStatus;
        this.addTaskToList(task);

        this.messageService.add({
            severity: 'success',
            summary: 'Task Moved',
            detail: `${task.title} moved to ${targetStatus}`
        });
    }

    private removeTaskFromList(task: Task) {
        this.todoTasks = this.todoTasks.filter(t => t.id !== task.id);
        this.inProgressTasks = this.inProgressTasks.filter(t => t.id !== task.id);
        this.doneTasks = this.doneTasks.filter(t => t.id !== task.id);
    }

    private addTaskToList(task: Task) {
        switch (task.status) {
            case 'todo':
                this.todoTasks.push(task);
                break;
            case 'in-progress':
                this.inProgressTasks.push(task);
                break;
            case 'done':
                this.doneTasks.push(task);
                break;
        }
    }

    getPrioritySeverity(priority: Task['priority']): 'success' | 'warning' | 'danger' {
        switch (priority) {
            case 'low':
                return 'success';
            case 'medium':
                return 'warning';
            case 'high':
                return 'danger';
        }
    }

    getStatusColor(status: Task['status']): string {
        switch (status) {
            case 'todo':
                return '#6b7280';
            case 'in-progress':
                return '#f59e0b';
            case 'done':
                return '#10b981';
        }
    }
}
