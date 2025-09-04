import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DragDropModule } from 'primeng/dragdrop';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TreeModule } from 'primeng/tree';
import { MessageService, TreeNode } from 'primeng/api';
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
        TreeModule,
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './drag-drop-examples.component.html',
    styleUrl: './drag-drop-examples.component.scss'
})
export class DragDropExamplesComponent implements OnInit {
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

    files: TreeNode[] = [
        {
            key: '0',
            label: 'Documents',
            data: 'Documents Folder',
            icon: 'pi pi-fw pi-inbox',
            children: [
                {
                    key: '0-0',
                    label: 'Work',
                    data: 'Work Folder',
                    icon: 'pi pi-fw pi-cog',
                    children: [
                        { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                        { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
                    ]
                },
                {
                    key: '0-1',
                    label: 'Home',
                    data: 'Home Folder',
                    icon: 'pi pi-fw pi-home',
                    children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
                }
            ]
        },
        {
            key: '1',
            label: 'Events',
            data: 'Events Folder',
            icon: 'pi pi-fw pi-calendar',
            children: [
                { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
                { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
                { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
            ]
        },
        {
            key: '2',
            label: 'Movies',
            data: 'Movies Folder',
            icon: 'pi pi-fw pi-star',
            children: [
                { key: '2-0', icon: 'pi pi-fw pi-star', label: 'Al Pacino', data: 'Pacino Movies' },
                { key: '2-1', icon: 'pi pi-fw pi-star', label: 'Robert De Niro', data: 'De Niro Movies' }
            ]
        }
    ];

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        // Tree data is already initialized above
    }

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
