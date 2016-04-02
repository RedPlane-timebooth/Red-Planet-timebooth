<div class="form-group">
    {!! Form::label('img_address', 'Upload Image') !!}
    {!! Form::file('img_address',['class' => 'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('name', 'Item name') !!}
    {!! Form::text('name', null, ['class' => 'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('description', 'Item description') !!}
    {!! Form::textarea('description', null, ['class' => 'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('price', 'Item price') !!}
    {!! Form::number('price', null, ['class' => 'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('available', 'Available Item') !!}
    {!! Form::number('available', null, ['class' => 'form-control']) !!}
</div>
<div class="form-group">
    @if ($categories)
        @foreach($categories as $category)
            {!! Form::checkbox('category', null, ['class' => 'form-control']) !!}
        @endforeach

    @endif
</div>
<div class="form-group">
    {!! Form::submit($submitButtonText,['class' => 'btn btn-default btn-primary pull-right']) !!}
</div>